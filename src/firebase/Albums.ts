import { AlbumInterface } from "../common/AlbumInterface";

const firebaseAlbums: any[] = [];

export const albumsArray = firebaseAlbums.map((item) => {
  return {
    artist: item.artist,
    spotifyUrl: item.spotifyUrl,
    tags: item.tags,
    title: item.title,
    year: item.year,
  } as AlbumInterface;
});

const albums: AlbumInterface[] = [];
