import React, { useState } from "react";
import { connect } from "react-redux"
import "./Schedule.css"
import Task from "./Task"
import PopUpForm from "./PopUpForm"
import {dayNames} from "../variables"
import ConnectedApp from "../App";
import { getVisibleTasks } from "../selectors/tasks"

function Schedule(props) {

  const [showForm, setShowForm] = useState(false);

  function displayAddTask () {
    setShowForm(!showForm)
  }

  return(
    <div id="schedule">
      <div className="grid">
        
        {/* ROW HEADER: TIME */}
        {/* For an array of 0 to 24 hours, we create a name for each row header in the calendar grid */}
        {[...Array(25)].map((e,i) => {
          if (i < 10) {
            i = "0" + i
          }
          let gridRowName = "time-"+i+"00"
          return <h4 key={i} className="time-slot" style={{gridRow: gridRowName}}>{i}:00</h4>
        })}


        {/* COLUMN HEADER: DAYS */}
        {/* For an array of Su-Sa, we create a name for each column header in the calendar grid */}
        {dayNames.map((e, i) => {
          return <span key={i} className="day-slot" aria-hidden="true" style={{gridColumn: e, textTransform: "capitalize"}}>{e}</span>
        })}

        {/* DAYS/TASKS */}
        {/* For every task in tasks state, assign a Task component: */}
        {props.filteredTasks.map((task) => {
          return(
            <Task
              {...task}
            />
          )})}
      </div>
      <button onClick={displayAddTask} className="add-task" >
        <i className="fa fa-plus" aria-hidden="true"></i>
        <span>Add a task</span>
      </button>
      
      {showForm &&
        <PopUpForm
          open={showForm}
          handleClose={displayAddTask}
          mode={"Add"}
        />
      }

    </div>
  )
}

const ConnectedSchedule = connect(({tasks, driver, week}) => {
  return {
    filteredTasks: getVisibleTasks(tasks, driver, week)
  }
})(Schedule);

export default ConnectedSchedule;