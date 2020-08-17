import React from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule";

export default function App(props) {

  return (
    <div className="App">

      <div id="topnav">
        <p>Task schedule</p>
      </div>

      <Header />
      <Schedule />
    </div>
  );
};
