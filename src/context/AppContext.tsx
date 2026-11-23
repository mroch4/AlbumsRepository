import { FC, createContext, useEffect, useMemo, useState } from "react";

import { AlbumInterface } from "../common/AlbumInterface";
import { ContextInterface } from "./interfaces/ContextInterface";
import { ContextProviderInterface } from "./interfaces/ContextProviderInterface";
import { Sorting } from "../common/SortingEnum";
import { Tag } from "../common/TagEnum";
import { albums as albumData } from "../albums";

export const AppContext = createContext<ContextInterface>({
  albums: [],
  albumsCount: 0,
  tagCounts: [],
  album: undefined,
  query: "",
  selectedTags: [],
  sorting: Sorting.ByArtistAscending,
  isLegacy: false,
  setAlbum: (): void => {
    throw new Error("Function not implemented.");
  },
  setQuery: (): void => {
    throw new Error("Function not implemented.");
  },
  setSelectedTags: (): void => {
    throw new Error("Function not implemented.");
  },
  setSorting: (): void => {
    throw new Error("Function not implemented.");
  },
  setIsLegacy: (): void => {
    throw new Error("Function not implemented.");
  },
});

export const AppContextProvider: FC<ContextProviderInterface> = ({ children }) => {
  const [album, setAlbum] = useState<AlbumInterface | undefined>(undefined);

  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [sorting, setSorting] = useState<Sorting>(Sorting.ByArtistAscending);
  const [isLegacy, setIsLegacy] = useState<boolean>(false);

  const categoryAlbums = useMemo(
    () => albumData.filter((album) => album.tags.includes(Tag.Legacy) === isLegacy),
    [isLegacy]
  );

  const tagCounts = useMemo(() => {
    const counts = new Map<Tag, number>();
    categoryAlbums.forEach((album: AlbumInterface) => {
      new Set(album.tags.filter((tag) => tag !== Tag.Legacy)).forEach((tag) => {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      });
    });

    return Array.from(counts, ([tag, count]) => ({ tag, count })).sort((a, b) =>
      a.tag.localeCompare(b.tag)
    );
  }, [categoryAlbums]);

  const filteredAlbums = useMemo(
    () =>
      categoryAlbums
        .filter((album: AlbumInterface) => {
          return (
            album.artist.toLowerCase().includes(query) ||
            album.title.toLowerCase().includes(query) ||
            album.year.toString().includes(query) ||
            album.tags.some((tag) => tag.includes(query))
          ) && selectedTags.every((tag) => album.tags.includes(tag));
        })
        .sort((a: AlbumInterface, b: AlbumInterface) => {
          switch (sorting) {
            case Sorting.ByArtistAscending:
              if (a.artist < b.artist) return -1;
              if (a.artist > b.artist) return 1;
              return a.year - b.year;
            case Sorting.ByArtistDescending:
              if (a.artist > b.artist) return -1;
              if (a.artist < b.artist) return 1;
              return b.year - a.year;
            case Sorting.ByTitleAscending:
              return a.title.localeCompare(b.title);
            case Sorting.ByTitleDescending:
              return b.title.localeCompare(a.title);
            case Sorting.ByYearAscending:
              if (a.year === b.year) return a.artist.localeCompare(b.artist);
              return a.year - b.year;
            case Sorting.ByYearDescending:
              if (a.year === b.year) return b.artist.localeCompare(a.artist);
              return b.year - a.year;
            default:
              return Math.random() - 0.5;
          }
        }),
    [categoryAlbums, query, selectedTags, sorting]
  );

  useEffect(() => {
    setAlbum(undefined);
    window.scrollTo(0, 0);
  }, [filteredAlbums]);

  return (
    <AppContext.Provider
      value={{
        album: album,
        albums: filteredAlbums,
        albumsCount: filteredAlbums.length,
        tagCounts: tagCounts,
        query: query,
        selectedTags: selectedTags,
        sorting: sorting,
        isLegacy: isLegacy,
        setAlbum: (spotifyUrl: string | undefined) => {
          const album = filteredAlbums.find((album) => album.spotifyUrl === spotifyUrl);
          setAlbum(album);
        },
        setQuery: setQuery,
        setSelectedTags: setSelectedTags,
        setSorting: setSorting,
        setIsLegacy: setIsLegacy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
