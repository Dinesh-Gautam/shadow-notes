import React from "react";
import { InputContext } from "./components/MainInput/InputContext";
import MainInput from "./components/MainInput/MainInput";
import "./styles/app.css";

function App() {
  return (
    <main>
      <InputContext>
        <MainInput />
      </InputContext>
    </main>
  );
}

export default App;
