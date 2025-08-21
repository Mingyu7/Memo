import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");
  const [palette, setPalette] = useState(() => localStorage.getItem("palette") || "blue");

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);
    localStorage.setItem("palette", palette);
  }, [palette]);

  const value = useMemo(() => ({ mode, palette, toggleMode, setPalette }), [mode, palette]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}