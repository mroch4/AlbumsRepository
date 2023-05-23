import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export const useAppContext = () => {
  return useContext(AppContext);
};
