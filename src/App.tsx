import React from "react";
import "./App.css";
import FetchComponent from "./FetchComponent";
import image from "../graph.png"
function App() {
  return (
    <div className="App">
      <FetchComponent />
      <img src={image} />
    </div>
  );
}

export default App;
