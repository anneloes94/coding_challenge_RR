import React from "react";
import "./Schedule.css"

export default function Schedule(props) {

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

        <div class="task" style={{gridColumn: "sunday", gridRow: "time-0500 / time-0700"}}>
          <h4 class="task-title">{props.title}</h4>
          <span class="task-time">8:00am - 9:00am</span><br/>
          <span class="task-day">Monday</span>
        </div>
        
      </div>

    </div>
  )
}