import React, { useState } from "react";
import "./Schedule.css"
import Day from "./Day"
import PopUpForm from "./PopUpForm"

export default function Schedule(props) {

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
        {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((e, i) => {
          return <span key={i} className="day-slot" aria-hidden="true" style={{gridColumn: e, textTransform: "capitalize"}}>{e}</span>
        })}

        {/* DAYS/TASKS */}
        {/* For every day in days state, assign a Day component: */}
        {props.days.map(day => {
          return(
            day.name && 
            <Day
              tasks={props.tasks}
              day={day}
              dayName={day.name}
            />
          )
        })}        
      </div>
      <button onClick={displayAddTask} className="add-task" >
        <i className="fa fa-plus" aria-hidden="true"></i>
        <span>Add a task</span>
      </button>
      
      {showForm &&
        <PopUpForm
          driver={props.driver}
          open={showForm}
          handleClose={displayAddTask}
          week={props.week}
          setStateWeek={(week) => props.setWeek(week)}
          mode={"Add"}
          handleTasksState={(task) => props.handleTasksState(task)}
          handleDaysState={(day) => props.handleDaysState(day)}
          allTasks={props.tasks}
          allDays={props.days}
        />
      }

    </div>
  )
}