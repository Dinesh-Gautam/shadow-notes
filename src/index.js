import React from "react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import { createRoot } from "react-dom/client";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Shared from "./components/Shared";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* ... etc. */}
      </Route>
      <Route path="shared/:userId/:docId" element={<Shared />} />
    </>
  )
);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
