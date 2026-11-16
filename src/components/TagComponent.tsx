import { FC } from "react";
import { TagComponentInterface } from "./interfaces/TagComponentInterface";
import { useAppContext } from "../hooks/useAppContext";

export const TagComponent: FC<TagComponentInterface> = (props): JSX.Element => {
  const { tag } = props;

  const { selectedTags, setQuery, setSelectedTags } = useAppContext();

  return (
    <span
      key={tag}
      className="badge bg-light text-dark mx-1 pointer"
      onClick={() => {
        if (selectedTags.length > 0) setSelectedTags([]);
        setQuery(tag);
      }}
    >
      {tag}
    </span>
  );
};
