import { FC } from "react";
import { useAppContext } from "../hooks/useAppContext";

interface TagComponentInterface {
  tag: string;
}

export const TagComponent: FC<TagComponentInterface> = (props): JSX.Element => {
  const { tag } = props;
  const { setQuery } = useAppContext();

  return (
    <span key={tag} className="me-2 tag pointer" onClick={() => setQuery(tag)}>
      {tag}
    </span>
  );
};
