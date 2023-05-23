import { Sorting } from "../common/SortingEnum";
import { useAppContext } from "../hooks/useAppContext";
import { useRef } from "react";

export const SearchComponent = (): JSX.Element => {
  const { query, sorting, setQuery, setSorting } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSorting(Sorting[event.currentTarget.value as keyof typeof Sorting]);
  };

  return (
    <section className="col-12 col-sm-6 col-md-4 col-lg-3">
      <input
        className="form-control form-control-sm my-1"
        onInput={(e) => setQuery(e.currentTarget.value.toLowerCase())}
        placeholder="Search..."
        ref={inputRef}
        type="text"
        value={query}
      />
      <select className="form-control form-control-sm my-1" onChange={handleChange}>
        {Object.keys(Sorting).map((key) => (
          <option key={key} value={key}>
            {Sorting[key as keyof typeof Sorting]}
          </option>
        ))}
      </select>
    </section>
  );
};
