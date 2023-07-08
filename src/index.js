import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { createRoot } from "react-dom/client";
import { InputContext } from "./components/MainInput/InputContext";
import { ModalProvider } from "./components/elements/Modal/Modal";
import { DatabaseContext } from "./context/DatabaseContext";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
