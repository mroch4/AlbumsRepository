import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./loader.css";

import { AppContextProvider } from "./context/AppContext";
import { HeaderComponent } from "./components/HeaderComponent";
import { ListComponent } from "./components/ListComponent";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <React.Fragment>
        <HeaderComponent />
        <ListComponent />
      </React.Fragment>
    </AppContextProvider>
  </React.StrictMode>
);
