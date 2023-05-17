import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
