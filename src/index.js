import React, { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/styles.scss";
import { initializeTheme } from "./components/Theme";
import { LazyMotion } from "framer-motion";

const animationFeatures = () =>
  import("./animations.js").then((res) => res.default);

const Shared = lazy(() => import("./components/Shared"));
const SharedNotes = lazy(() => import("./components/SharedNotes"));
const App = lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container);

initializeTheme();

root.render(
  <LazyMotion features={animationFeatures}>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/shared" element={<SharedNotes />} />
            <Route path="/shared/:userId/:docId" element={<Shared />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </LazyMotion>
);
