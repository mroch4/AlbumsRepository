const fs = require("node:fs");
const path = require("node:path");

const collectionName = "albums_v2";
const sourcePath = path.resolve(__dirname, "..", ".firestore", "2026-11-17 copy.json");
const applying = process.argv.includes("--apply");
const argumentValue = (name) => {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
};

function readAlbums() {
  const contents = fs.readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
  const albums = JSON.parse(contents);

  if (!Array.isArray(albums)) {
    throw new Error("The album JSON must contain an array.");
  }

  const ids = new Set();
  for (const [index, album] of albums.entries()) {
    if (
      typeof album.id !== "string" ||
      !album.id ||
      typeof album.artist !== "string" ||
      typeof album.spotifyUrl !== "string" ||
      !Array.isArray(album.tags) ||
      !album.tags.every((tag) => typeof tag === "string") ||
      typeof album.title !== "string" ||
      !Number.isInteger(album.year)
    ) {
      throw new Error(`Album at index ${index} has invalid or missing fields.`);
    }

    if (ids.has(album.id)) {
      throw new Error(`Duplicate Firestore document ID: ${album.id}`);
    }
    ids.add(album.id);
  }

  return albums;
}

async function replaceCollection(albums, projectId) {
  const { applicationDefault, initializeApp } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  const app = initializeApp({ credential: applicationDefault(), projectId });

  try {
    const collection = getFirestore(app).collection(collectionName);
    const existing = await collection.get();

    for (let start = 0; start < existing.docs.length; start += 450) {
      const batch = getFirestore(app).batch();
      existing.docs.slice(start, start + 450).forEach((document) => batch.delete(document.ref));
      await batch.commit();
    }

    for (let start = 0; start < albums.length; start += 450) {
      const batch = getFirestore(app).batch();
      albums.slice(start, start + 450).forEach(({ id, ...fields }) => {
        batch.set(collection.doc(id), fields);
      });
      await batch.commit();
    }
  } finally {
    await app.delete();
  }
}

async function main() {
  const albums = readAlbums();
  console.log(`Validated ${albums.length} albums for ${collectionName}.`);

  if (!applying) {
    console.log("Dry run only. Add --apply, --project <project-id>, and --confirm-project <project-id> to write.");
    return;
  }

  const projectId = argumentValue("--project");
  const confirmedProjectId = argumentValue("--confirm-project");
  if (!projectId || confirmedProjectId !== projectId) {
    throw new Error("--project and a matching --confirm-project are required before writing.");
  }

  await replaceCollection(albums, projectId);
  console.log(`Replaced ${collectionName} in Firebase project ${projectId}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
