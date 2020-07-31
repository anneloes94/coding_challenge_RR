import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule"

// colour scheme:
// https://material.io/resources/color/#!/?view.left=0&view.right=1&secondary.color=2ca675&primary.color=5a7be4&primary.text.color=000000

export default function App() {

  const [week, setWeek] = useState(1)
  const [driver, setDriver] = useState("")
  
  // {
  //   tasksPerDriver: {
  //     John: {
  //       week_1: {
  //         Sunday: [
  //           {"1": {
  //             "task": "Dropoff",
  //             "start_time": 8,
  //             "end_time": 10
  //           }},
  //           {"2": {
  //             "task": "Other",
  //             "start_time": 8,
  //             "end_time": 12
  //           }}
  //         ]
  //       }
  //     }
  //   }
  // };

  const changeDriver = (newDriver) => {
    setDriver(newDriver)
  }

  const changeWeek = (newWeek) => {
    setWeek(newWeek)
  }

  return (
    <div className="App">
      <div id="topnav">
        <p>Task schedule</p>
      </div>

      <Header 
        changeDriver={changeDriver}
        changeWeek={changeWeek}
        driver={driver} 
        week={week} 
      />
      <Schedule 
        
        startTime={"0800"}
        endTime={"1000"}
        title={"Dropoff"}
      />
    </div>
  );
}
