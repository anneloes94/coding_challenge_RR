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
        
        {/* ROW HEADERS: TIME */}
        {/* For an array of 0 to 23 hours, we create a name for each row header */}
        {[...Array(24)].map((e,i) => {
          if (i < 10) {
            i = "0" + i
          }
          let gridRowName = "time-"+i+"00"
          return <h4 class="time-slot" style={{gridRow: gridRowName}}>{i}:00</h4>
        })}


        {/* COLUMN HEADERS: DAYS */}
        {/* For an array of Su-Sa, we create a name for each column header: */}
        {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((e) => {
          return <span class="day-slot" aria-hidden="true" style={{gridColumn: e, textTransform: "capitalize"}}>{e}</span>
        })}

        <div class="task monday task-1">
          <h4 class="task-title">Pickup</h4>
          <span class="task-time">8:00am - 9:00am</span><br/>
          <span class="task-day">Monday</span>
        </div>
      </div>

    </div>
  )
}