import React from "react";
import Aside from "./components/Aside";
import MainPart from "./components/MainPart";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Aside />
      <MainPart/>
    </div>
  );
}

export default App;
