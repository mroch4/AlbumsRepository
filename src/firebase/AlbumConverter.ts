import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

import { FirebaseAlbumInterface } from "./FirebaseAlbumInterface";

export const AlbumConverter: FirestoreDataConverter<FirebaseAlbumInterface> = {
  toFirestore(album: WithFieldValue<FirebaseAlbumInterface>): DocumentData {
    return {
      artist: album.artist,
      clicked: album.clicked,
      cover: album.cover,
      spotifyUrl: album.spotifyUrl,
      tags: album.tags,
      title: album.title,
      year: album.year,
      youtubeUrl: album.youtubeUrl,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FirebaseAlbumInterface {
    const album = snapshot.data(options);
    return {
      artist: album.artist,
      clicked: album.clicked,
      cover: album.cover,
      spotifyUrl: album.spotifyUrl,
      tags: album.tags,
      title: album.title,
      year: album.year,
      youtubeUrl: album.youtubeUrl,
      id: snapshot.id,
      ref: snapshot.ref,
    };
  },
};
