import { AlbumInterface } from "../../common/AlbumInterface";
import { Sorting } from "../../common/SortingEnum";

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
