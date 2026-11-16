import { AlbumInterface } from "../../common/AlbumInterface";
import { Sorting } from "../../common/SortingEnum";

export interface ContextInterface {
  albums: AlbumInterface[];
  albumsCount: number;
  tagCounts: { tag: string; count: number }[];
  loading: boolean;
  album: AlbumInterface | undefined;
  query: string;
  selectedTags: string[];
  sorting: Sorting;
  setAlbum: (id: string | undefined) => void;
  setQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSorting: (index: Sorting) => void;
}
