import { AlbumCardComponent } from "./AlbumCardComponent";
import { AlbumCoverComponent } from "./AlbumCoverComponent";
import { Container } from "react-bootstrap";
import { LoaderComponent } from "./LoaderComponent";
import React from "react";
import { useAppContext } from "../hooks/useAppContext";

export const ListComponent = (): JSX.Element => {
  const { albumsList, loading, modalAlbum } = useAppContext();

  return (
    <React.Fragment>
      {loading === true ? (
        <LoaderComponent />
      ) : (
        <Container className="d-flex flex-wrap align-content-start albums-list">
          {albumsList.map((item) => (
            <AlbumCoverComponent data={item} key={item.cover} />
          ))}
          {modalAlbum === undefined ? null : <AlbumCardComponent data={modalAlbum} />}
        </Container>
      )}
    </React.Fragment>
  );
};
