import React from "react";
import "./Schedule.css"

export default function Schedule(props) {

  let tasksPerDriver = {
    John: {
      week_1: {
        Sunday: {
          8: {
            "task": "dropoff",
            "end_time": 10
          },
          11: {
            "task": "other",
            "end_time": 12
          }
        }
      }
    }
  }

  return(
    <div id="schedule">
      <div class="grid">
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "sunday"}}>Sunday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "monday"}}>Monday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "tuesday"}}>Tuesday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "wednesday"}}>Wednesday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "thursday"}}>Thursday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "friday"}}>Friday</span>
        <span class="day-slot" aria-hidden="true" style={{gridColumn: "saturday"}}>Saturday</span>


        <h3 class="time-slot">8:00am</h3>
        <div class="task monday task-1">
          <h4 class="task-title">Pickup</h4>
          <span class="task-time">8:00am - 9:00am</span><br/>
          <span class="task-day">Monday</span>
        </div>
      </div>

    </div>
  )
}