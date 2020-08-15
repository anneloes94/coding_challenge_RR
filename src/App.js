import React from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import { convertToClockTime, getDayRangeByWeek } from "./helpers/convertors";
import configureStore from "./store/configureStore";
import { addTask, editTask, deleteTask } from "./actions/tasks"
import { incrementWeek, decrementWeek, setWeek} from "./actions/week";
import setDriver from "./actions/driver";
import getVisibleTasks from "./selectors/tasks";

const store = configureStore();

store.dispatch(setDriver({id: 1, name: "Bob"}))

const state = store.getState()
console.log(state)
const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)
console.log(visibleTasks)

store.subscribe(() => {
  const state = console.log(store.getState())
  const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)
})



export default function App() {

  return (
    <div className="App">
      <div id="topnav">
        <p>Task schedule</p>
      </div>

      {/* <Header 
      />
 
      <Schedule 
        // handleTasksState={(task) => setTask([...tasks, task])}
        // handleDaysState={(day) => setDay([...days, day])}
      /> */}
    </div>
  );
}
