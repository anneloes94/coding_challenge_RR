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
      <div class="schedule">

        <h3 class="time-slot">8:00am</h3>
        <div class="task monday">
          <h4 class="task-title">Pickup</h4>
          <span class="task-time">8:00am - 9:00am</span><br/>
          <span class="task-day">Monday</span>
        </div>

        <h3 class="time-slot">9:00am</h3>
        <div class="task task-5 monday">
          <h4 class="task-title">Other</h4>
          <span class="task-time">9:00am - 10:00am</span><br/>
          <span class="task-day">Monday</span>
        </div>
      </div>

    </div>
  )
}