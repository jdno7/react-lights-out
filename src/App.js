import React from "react";
import Board from "./Board";
import "./App.css";
import {v4 as uuid} from "uuid"


/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board id={uuid()} cols={3} rows={3} chanceLightStartsOn={.5}/>
    </div>
  );
}

export default App;
