import { collection, getFirestore } from "firebase/firestore";

import { AlbumConverter } from "./AlbumConverter";
import { firebaseConfig } from "./FirebaseConfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

export const firestoreDatabase = getFirestore(app);

export const ref = collection(firestoreDatabase, "albums").withConverter(AlbumConverter);
