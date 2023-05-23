import { Container, Navbar } from "react-bootstrap";

import { SearchComponent } from "./SearchComponent";
import { useAppContext } from "../hooks/useAppContext";

export const HeaderComponent = (): JSX.Element => {
  const { setQuery } = useAppContext();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <div className="top-nav mx-4">
        <Navbar.Brand className="pointer" onClick={() => setQuery("")}>
          Albums Repository
        </Navbar.Brand>
        <SearchComponent />
      </div>
    </Navbar>
  );
};
