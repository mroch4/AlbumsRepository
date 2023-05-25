import { FC } from "react";
import { TagComponentInterface } from "./interfaces/TagComponentInterface";
import { useAppContext } from "../hooks/useAppContext";

export const TagComponent: FC<TagComponentInterface> = (props): JSX.Element => {
  const { tag } = props;

  const { setQuery } = useAppContext();

  return (
    <span key={tag} className="badge bg-light text-dark me-2  pointer" onClick={() => setQuery(tag)}>
      {tag}
    </span>
  );
};
