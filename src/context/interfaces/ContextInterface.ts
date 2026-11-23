import { AlbumInterface } from "../../common/AlbumInterface";
import { Sorting } from "../../common/SortingEnum";
import { Tag } from "../../common/TagEnum";

export interface ContextInterface {
  albums: AlbumInterface[];
  albumsCount: number;
  tagCounts: { tag: Tag; count: number }[];
  album: AlbumInterface | undefined;
  query: string;
  selectedTags: Tag[];
  sorting: Sorting;
  isLegacy: boolean;
  setAlbum: (spotifyUrl: string | undefined) => void;
  setQuery: (query: string) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setSorting: (index: Sorting) => void;
  setIsLegacy: (isLegacy: boolean) => void;
}
