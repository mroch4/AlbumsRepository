import { AlbumCardComponent } from "./AlbumCardComponent";
import { AlbumCoverComponent } from "./AlbumCoverComponent";
import { LoaderComponent } from "./LoaderComponent";
import React from "react";
import { useAppContext } from "../hooks/useAppContext";

export const ListComponent = (): JSX.Element => {
  const { album, albums, loading } = useAppContext();

  return (
    <React.Fragment>
      {loading === true ? (
        <LoaderComponent />
      ) : (
        <React.Fragment>
          <section className="d-flex flex-wrap align-content-start albums-list mx-3">
            {albums.map((item) => (
              <AlbumCoverComponent data={item} key={item.cover} />
            ))}
          </section>
          <section>{album === undefined ? null : <AlbumCardComponent data={album} />}</section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
