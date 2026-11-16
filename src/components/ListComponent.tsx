import { AlbumCardComponent } from "./AlbumCardComponent";
import { AlbumCoverComponent } from "./AlbumCoverComponent";
import { LoaderComponent } from "./LoaderComponent";
import { AlbumInterface } from "../common/AlbumInterface";
import React from "react";
import { useAppContext } from "../hooks/useAppContext";

export const ListComponent = (): JSX.Element => {
  const { album, albums, loading, selectedTags, setSelectedTags, tagCounts } = useAppContext();
  const fallbackKeys = React.useRef(new WeakMap<AlbumInterface, string>());

  return (
    <React.Fragment>
      {loading === true ? (
        <LoaderComponent />
      ) : (
        <React.Fragment>
          <section className="d-flex flex-wrap align-content-start albums-list mx-2">
            <div className="w-100 mb-3 text-center">
              <div aria-label="Filter by tags" id="tag-filter" role="group">
                {tagCounts.map(({ tag, count }) => (
                  <button
                    aria-pressed={selectedTags.includes(tag)}
                    className={`badge m-1 border-0 pointer ${
                      selectedTags.includes(tag) ? "bg-secondary text-light" : "bg-light text-dark"
                    }`}
                    key={tag}
                    onClick={() =>
                      setSelectedTags(
                        selectedTags.includes(tag)
                          ? selectedTags.filter((selectedTag) => selectedTag !== tag)
                          : [...selectedTags, tag]
                      )
                    }
                    type="button"
                  >
                    {tag}: {count}
                  </button>
                ))}
              </div>
            </div>
            {albums.map((item) => {
              let key = item.spotifyUrl;
              if (!key) {
                key = fallbackKeys.current.get(item) ?? Math.random().toString(36).slice(2);
                fallbackKeys.current.set(item, key);
              }

              return <AlbumCoverComponent data={item} key={key} />;
            })}
          </section>
          <section>{album === undefined ? null : <AlbumCardComponent data={album} />}</section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
