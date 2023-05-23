import { AlbumInterface } from "./AlbumInterface";
import { Sorting } from "../SortingEnum";

export interface ContextInterface {
  albumsList: AlbumInterface[];
  loading: boolean;
  modalAlbum: AlbumInterface | undefined;
  query: string;
  sorting: Sorting;
  setModalAlbum: (id: string | undefined) => void;
  setQuery: (query: string) => void;
  setSorting: (index: Sorting) => void;
}
