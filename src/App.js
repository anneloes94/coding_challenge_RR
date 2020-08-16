import React from "react";
import "./App.css";
import { connect } from "react-redux"
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import { convertToClockTime, getDayRangeByWeek } from "./helpers/convertors";
import configureStore from "./store/configureStore";
import { addTask, editTask, deleteTask } from "./actions/tasks"
import { incrementWeek, decrementWeek, setWeek} from "./actions/week";
import setDriver from "./actions/driver";
import getVisibleTasks from "./selectors/tasks";

// const store = configureStore();

// store.dispatch(setDriver({id: 1, name: "Bob"}))

// const state = store.getState()
// const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)

// store.subscribe(() => {
//   const state = console.log(store.getState())
//   const visibleTasks = getVisibleTasks(state.tasks, state.driver, state.week)
// })



function App(props) {

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

const ConnectedApp = connect((state) => {
  // format:
  // props name: state value
  return {
    name: state.tasks[0].driver
  }
})(App);

export default ConnectedApp;