import { FC, useEffect, useState } from "react";

import { AlbumComponentInterface } from "./interfaces/AlbumComponentInterface";
import { useAppContext } from "../hooks/useAppContext";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const getRowSize = (width: number) => {
  const x: number = width;
  switch (true) {
    case x < 240:
      return 1;
    case x < 320:
      return 2;
    case x < 480:
      return 3;
    case x < 576:
      return 3;
    case x < 768:
      return 4;
    case x < 992:
      return 5;
    case x < 1200:
      return 6;
    case x < 1440:
      return 8;
    default:
      return 10;
  }
};

export const AlbumCoverComponent: FC<AlbumComponentInterface> = (props): JSX.Element => {
  const { artist, cover, title, year } = props.data;
  const { setModalAlbum } = useAppContext();
  const { width } = useWindowDimensions();
  const [imgSize, setImgSize] = useState<number>();

  useEffect(() => {
    const imageSize = 100 / getRowSize(width);
    setImgSize(imageSize);
  }, [width]);

  const desc = `${artist} - ${title} (${year})`;

  return (
    <img
      alt={desc}
      className="album-cover pointer"
      height={`${imgSize}%`}
      onClick={() => setModalAlbum(cover)}
      src={cover.startsWith("_") ? `https://placehold.co/300?text=${title}` : `covers/${cover}.jpg`}
      title={desc}
      width={`${imgSize}%`}
    />
  );
};
