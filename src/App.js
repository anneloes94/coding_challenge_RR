import React, { useState, useEffect } from "react";
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
      day: "thursday",
      tasks: [2]
    },
    {
      id: 13,
      day: "friday",
      tasks: [3]
    }
  ])

  // Variables dependent on state
  let filteredDays;
  let filteredTasks;

  useEffect(() => {
    filteredDays = filterDaysByWeek(week, days)
    filteredTasks = filterTasksByDriver(driver, tasks)
  }, [week, driver])

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
        tasks={filteredTasks}
        days={filteredDays} 
      />

      {driver && 
      <Schedule 
        tasks={filterTasksByDriver(driver, tasks)}
        days={filterDaysByWeek(week, days)}
      />}
    </div>
  );
}
