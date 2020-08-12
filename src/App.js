import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule"
import { filterDaysByWeek, filterTasksByDriver } from "./helpers/selectors"

export default function App() {

  // STATE
  const [week, setWeek] = useState(1);
  const [driver, setDriver] = useState({});
  const [tasks, setTask] = useState([
    {
      id: 1,
      title: "dropoff",
      driver: 1,
      start_time: 1000,
      end_time: 1200

    },
    {
      id: 2,
      title: "other",
      driver: 3,
      start_time: 1600,
      end_time: 1800
    },
    {
      id: 3,
      title: "pickup",
      driver: 2,
      start_time: 1500,
      end_time: 1600
    }
  ])
  const [days, setDay] = useState([
    {
      id: 1,
      name: "sunday",
      tasks: [1]
    },
    {
      id: 5,
      name: "thursday",
      tasks: [2]
    },
    {
      id: 13,
      name: "friday",
      tasks: [3]
    }
  ])

  // FUNCTIONS

  const changeDriver = (newDriver) => {
    setDriver(newDriver)
  }

  const changeWeek = (newWeek) => {
    setWeek(newWeek)
  }

  // RENDERING

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
        tasks={filterTasksByDriver(driver, tasks)}
        days={filterDaysByWeek(week, days)} 
      />

      {driver && 
      <Schedule 
        driver={driver}
        tasks={filterTasksByDriver(driver, tasks)}
        days={filterDaysByWeek(week, days)}
      />}
    </div>
  );
}
