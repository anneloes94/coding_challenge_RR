import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule"

// colour scheme:
// https://material.io/resources/color/#!/?view.left=0&view.right=1&secondary.color=2ca675&primary.color=5a7be4&primary.text.color=000000

export default function App() {

  const [week, setWeek] = useState(1);
  const [driver, setDriver] = useState("");
  const [tasks, setTask] = useState([
    {
      id: 1,
      title: "dropoff",
      trucker: 1,
      start_time: 1000,
      end_time: 12000

    },
    {
      id: 2,
      title: "other",
      trucker: 2,
      start_time: 1600,
      end_time: 1800
    }
  ])
  const [days, setDay] = useState([
    {
      id: 1,
      name: "sunday",
      tasks: [1]
    }
  ])
  const [truckers, setTruckers] = useState([
    {
      id: 1,
      name: "Michael Schumacher"
    },
    {
      id: 2,
      name: "Lewis Hamilton"
    },
    {
      id: 3,
      name: "Max Verstappen"
    }
  ])

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
