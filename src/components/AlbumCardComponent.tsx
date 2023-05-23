import { doc, increment, updateDoc } from "firebase/firestore";

import { AlbumComponentInterface } from "./interfaces/AlbumComponentInterface";
import { FC } from "react";
import { Modal } from "react-bootstrap";
import { NoteIcon } from "./icons/NoteIcon";
import { SpotifyIconComponent } from "./icons/SpotifyIconComponent";
import { TagComponent } from "./TagComponent";
import { YouTubeIconComponent } from "./icons/YouTubeIconComponent";
import { firestoreDatabase } from "../firebase/Firebase";
import { useAppContext } from "../hooks/useAppContext";

export const AlbumCardComponent: FC<AlbumComponentInterface> = (props): JSX.Element => {
  const { artist, clicked, cover, id, spotifyUrl, tags, title, year, youtubeUrl } = props.data;

  const { modalAlbum, setQuery, setModalAlbum } = useAppContext();

  const desc = `${artist} - ${title} (${year})`;
  const iconSize: number = 20;
  const coverSize: number = 300;

  const handleOnClick = async () => {
    const albumRef = doc(firestoreDatabase, "albums", id!);

    await updateDoc(albumRef, {
      clicked: increment(1),
    });
  };

  return (
    <Modal show={modalAlbum !== undefined} onHide={() => setModalAlbum(undefined)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <section className="d-flex justify-content-center mb-3">
          <img
            alt={desc}
            className="shadow"
            height={coverSize}
            src={cover.startsWith("_") ? `https://placehold.co/300?text=${title}` : `covers/${cover}.jpg`}
            title={desc}
            width={coverSize}
          />
        </section>
        <section>
          <h4 className="text-center">{title}</h4>
          <h5 className="text-center pointer" onClick={() => setQuery(artist.toLowerCase())}>
            {artist}
          </h5>
          <h5 className="text-center pointer" onClick={() => setQuery(year.toString())}>
            {year}
          </h5>
        </section>
        <section className="d-flex justify-content-center my-3">
          {tags
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <TagComponent key={tag} tag={tag} />
            ))}
        </section>
        <section className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            {spotifyUrl === "" ? null : <SpotifyIconComponent href={spotifyUrl} size={iconSize} onClickHandler={handleOnClick} />}
            {youtubeUrl === "" ? null : <YouTubeIconComponent href={youtubeUrl} size={iconSize} onClickHandler={handleOnClick} />}
          </div>
          <div>
            <NoteIcon size={iconSize} />
            <span className="ms-2">{clicked}</span>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};
