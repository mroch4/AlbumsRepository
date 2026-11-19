
import { AlbumComponentInterface } from "./interfaces/AlbumComponentInterface";
import { FC } from "react";
import { Modal } from "react-bootstrap";
import { TagComponent } from "./TagComponent";
import { useAppContext } from "../hooks/useAppContext";

export const AlbumCardComponent: FC<AlbumComponentInterface> = (props): JSX.Element => {
  const { artist, coverExtension = "jpg", spotifyUrl, tags, title, year } = props.data;

  const { album, selectedTags, setQuery, setSelectedTags, setAlbum } = useAppContext();

  const desc = `${artist} - ${title} (${year})`;
  const coverSize: number = 300;
  const cover = (
    <img
      alt={desc}
      className="shadow"
      height={coverSize}
      src={`covers/${spotifyUrl}.${coverExtension}`}
      title={desc}
      width={coverSize}
    />
  );
  const isSpotifyAlbum = !spotifyUrl.startsWith("_");
  const searchFor = (value: string): void => {
    if (selectedTags.length > 0) setSelectedTags([]);
    setQuery(value);
  };

  return (
    <Modal show={album !== undefined} onHide={() => setAlbum(undefined)}>
      <Modal.Header closeButton />
      <Modal.Body>
        <section className="d-flex justify-content-center mb-3">
          {isSpotifyAlbum ? (
            <a
              href={`https://open.spotify.com/album/${spotifyUrl}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {cover}
            </a>
          ) : (
            cover
          )}
        </section>
        <section>
          <h3 className="text-center">{title}</h3>
          <h5 className="text-center pointer" onClick={() => searchFor(artist.toLowerCase())}>
            {artist}
          </h5>
          <h6 className="text-center pointer" onClick={() => searchFor(year.toString())}>
            {year}
          </h6>
        </section>
        <section className="d-flex justify-content-center my-3">
          {tags
            .sort((a, b) => a.localeCompare(b))
            .map((tag) => (
              <TagComponent key={tag} tag={tag} />
            ))}
        </section>
      </Modal.Body>
    </Modal>
  );
};
