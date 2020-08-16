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
        {/* For an array of 0 to 23 hours, we create a name for each row header in the calendar grid */}
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
        {/* For every day in days state, assign a Day component: */}
        {/* We filter tasks by the day they belong to */}
        {props.filteredTasks.map((task, index) => {
          return(
            <Task
              task={task}
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

const ConnectedSchedule = connect((state) => {
  return {
    filteredTasks: getVisibleTasks(state.tasks, state.driver, state.week)
  }
})(Schedule);

export default ConnectedSchedule;