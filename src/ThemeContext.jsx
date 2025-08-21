import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  mode: "light",
  palette: "blue",
  toggleMode: () => {},
  setPalette: () => {},
});
export const useTheme = () => useContext(ThemeContext);