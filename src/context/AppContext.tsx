import { FC, createContext, useEffect, useState } from "react";

import { AlbumInterface } from "../common/AlbumInterface";
import { ContextInterface } from "./interfaces/ContextInterface";
import { ContextProviderInterface } from "./interfaces/ContextProviderInterface";
import { Sorting } from "../common/SortingEnum";
import { ref } from "../firebase/Firebase";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

export const AppContext = createContext<ContextInterface>({
  albums: [],
  albumsCount: 0,
  loading: true,
  album: undefined,
  query: "",
  sorting: Sorting.ByArtistAscending,
  setAlbum: (): void => {
    throw new Error("Function not implemented.");
  },
  setQuery: (): void => {
    throw new Error("Function not implemented.");
  },
  setSorting: (): void => {
    throw new Error("Function not implemented.");
  },
});

export const AppContextProvider: FC<ContextProviderInterface> = ({ children }) => {
  const [data, loading] = useCollectionDataOnce(ref);

  const [album, setAlbum] = useState<AlbumInterface | undefined>(undefined);
  const [albums, setAlbums] = useState<AlbumInterface[]>([]);
  const [albumsCount, setAlbumsCount] = useState<number>(0);

  const [query, setQuery] = useState<string>("");
  const [sorting, setSorting] = useState<Sorting>(Sorting.ByArtistAscending);

  useEffect(() => {
    if (data !== undefined) {
      setAlbums(
        data
          .filter((album: AlbumInterface) => {
            return (
              album.artist.toLowerCase().includes(query) ||
              album.title.toLowerCase().includes(query) ||
              album.year.toString().includes(query) ||
              album.tags.includes(query)
            );
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
              case Sorting.ByClickedAscending:
                if (a.clicked === b.clicked) return Math.random() - 0.5;
                return a.clicked - b.clicked;
              case Sorting.ByClickedDescending:
                if (a.clicked === b.clicked) return Math.random() - 0.5;
                return b.clicked - a.clicked;
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
          })
      );
    }
    setAlbum(undefined);
  }, [data, query, sorting]);

  useEffect(() => {
    setAlbumsCount(albums.length);
    window.scrollTo(0, 0);
  }, [albums]);

  return (
    <AppContext.Provider
      value={{
        album: album,
        albums: albums,
        albumsCount: albumsCount,
        loading: loading,
        query: query,
        sorting: sorting,
        setAlbum: (cover: string | undefined) => {
          const album = albums.find((album) => album.cover === cover);
          setAlbum(album);
        },
        setQuery: setQuery,
        setSorting: setSorting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
