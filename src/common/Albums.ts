import { AlbumInterface } from "./interfaces/AlbumInterface";

const firebaseAlbums: any[] = [];

export const albumsArray = firebaseAlbums.map((item) => {
  return {
    artist: item.artist,
    clicked: item.clicked,
    cover: item.cover,
    spotifyUrl: item.spotifyUrl,
    tags: item.tags,
    title: item.title,
    year: item.year,
    youtubeUrl: item.youtubeUrl,
  } as AlbumInterface;
});

const albums: AlbumInterface[] = [];
