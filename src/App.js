import React from "react";
import "./App.css";
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import { convertToClockTime, getDayRangeByWeek } from "./helpers/convertors";
import configureStore from "./store/configureStore";
import { addTask, editTask, deleteTask } from "./actions/tasks"
import { incrementWeek, decrementWeek, setWeek} from "./actions/week";
import { setDriver } from "./actions/driver";
import getVisibleTasks from "./selectors/tasks";

const store = configureStore();

const taskOne = store.dispatch(addTask({ title: "pickup", driver: 3, day: 4, startTime: "0400", endTime: "0600"}))
const taskTwo = store.dispatch(addTask({ title: "dropoff", driver: 2, day: 14, startTime: "0600", endTime: "0700"}))
store.dispatch(deleteTask({id: 1}))
store.dispatch(editTask(taskTwo.task.id, {
  title: "other"
}))

console.log(store.getState())

store.subscribe(() => {
  const state = console.log(store.getState())
  const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)
  console.log(visibleTasks)
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
