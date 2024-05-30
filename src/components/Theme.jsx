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

  function changeStateMode(mode) {
    setMode(mode);
    localStorage.setItem("theme", mode);
  }

  function toggle() {
    const html = document.getElementsByTagName("html")[0];
    let mode = html.dataset.theme;

    if (mode === "dark") {
      mode = "light";
    } else {
      mode = "dark";
    }

    html.dataset.theme = mode;
    changeStateMode(mode);
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
