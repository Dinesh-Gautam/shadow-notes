import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useState } from "react";

function updateTheme(mode) {
  const html = document.getElementsByTagName("html")[0];
  html.dataset.theme = mode;
}

function getDefaultTheme() {
  const html = document.getElementsByTagName("html")[0];
  return html.dataset.theme;
}

export function initializeTheme() {
  // get Theme from localStorage
  const theme = localStorage.getItem("theme");
  if (theme) updateTheme(theme);
}

export function ToggleButton() {
  const [mode, setMode] = useState(getDefaultTheme);

  function toggle() {
    const html = document.getElementsByTagName("html")[0];
    if (html.dataset.theme === "dark") {
      html.dataset.theme = "light";
      setMode("light");
      localStorage.setItem("theme", "light");
    } else {
      html.dataset.theme = "dark";
      setMode("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button onClick={toggle}>
      {mode === "dark" ? (
        <LightModeOutlined fontSize="small" />
      ) : (
        <DarkModeOutlined fontSize="small" />
      )}
      {mode === "dark" ? "Light" : "Dark"}
    </button>
  );
}
