import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Shared from "./components/Shared";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* ... etc. */}
        </Route>
        <Route path="/shared/:userId/:docId" element={<Shared />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
