import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule"
import { filterDaysByWeek, filterTasksByDriver } from "./helpers/selectors"
import configureStore from "./store/configureStore";

const store = configureStore();

console.log(store.getState())

export default function App() {

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
        week={week}
        handleTasksState={(task) => setTask([...tasks, task])}
        handleDaysState={(day) => setDay([...days, day])}
        setWeek={setWeek}
      />}
    </div>
  );
}
