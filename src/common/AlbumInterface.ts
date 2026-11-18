import { Tag } from "./TagEnum";

export interface AlbumInterface {
  artist: string;
  spotifyUrl: string;
  coverExtension?: "jpg" | "JPG";
  tags: Tag[];
  title: string;
  year: number;
}
