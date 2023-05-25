import { AlbumInterface } from "./AlbumInterface";
import { Sorting } from "../SortingEnum";

export interface ContextInterface {
  albums: AlbumInterface[];
  albumsCount: number;
  loading: boolean;
  album: AlbumInterface | undefined;
  query: string;
  sorting: Sorting;
  setAlbum: (id: string | undefined) => void;
  setQuery: (query: string) => void;
  setSorting: (index: Sorting) => void;
}
