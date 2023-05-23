import { Container, Navbar } from "react-bootstrap";

import { SearchComponent } from "./SearchComponent";
import { useAppContext } from "../hooks/useAppContext";

export const HeaderComponent = (): JSX.Element => {
  const { setQuery } = useAppContext();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container className="d-flex flex-column flex-sm-row">
        <Navbar.Brand className="pointer" onClick={() => setQuery("")}>
          Albums Repository
        </Navbar.Brand>
        <SearchComponent />
      </Container>
    </Navbar>
  );
};
