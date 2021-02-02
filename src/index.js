import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { DatabaseContext } from "./context/DatabaseContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseContext>
        <App />
      </DatabaseContext>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
