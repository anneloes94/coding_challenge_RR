import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

// colour scheme:
// https://material.io/resources/color/#!/?view.left=0&view.right=1&secondary.color=2ca675&primary.color=5a7be4&primary.text.color=000000
// Noto Sans, sans serif

export default function App() {
  const [state, setState] = useState({
    week: 1,
    driver: "",
    tasksPerDriver: {},
  });
  return (
    <div className="App">
      <div id="topnav">
        <p>Task schedule</p>
      </div>

      <Header driver={state.driver} week={state.week} />
    </div>
  );
}
