import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

import { FirebaseAlbumInterface } from "./FirebaseAlbumInterface";

export const AlbumConverter: FirestoreDataConverter<FirebaseAlbumInterface> = {
  toFirestore(album: WithFieldValue<FirebaseAlbumInterface>): DocumentData {
    return {
      artist: album.artist,
      spotifyUrl: album.spotifyUrl,
      tags: album.tags,
      title: album.title,
      year: album.year
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FirebaseAlbumInterface {
    const album = snapshot.data(options);
    return {
      artist: album.artist,
      spotifyUrl: album.spotifyUrl,
      tags: album.tags,
      title: album.title,
      year: album.year,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};
