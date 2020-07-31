import React from "react";
import "./Schedule.css"

export default function Schedule(props) {

  return(
    <div id="schedule">
      <div className="grid">
        
        {/* ROW HEADER: TIME */}
        {/* For an array of 0 to 23 hours, we create a name for each row header */}
        {[...Array(24)].map((e,i) => {
          if (i < 10) {
            i = "0" + i
          }
          let gridRowName = "time-"+i+"00"
          return <h4 key={i} className="time-slot" style={{gridRow: gridRowName}}>{i}:00</h4>
        })}


        {/* COLUMN HEADER: DAYS */}
        {/* For an array of Su-Sa, we create a name for each column header: */}
        {["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((e, i) => {
          return <span key={i} className="day-slot" aria-hidden="true" style={{gridColumn: e, textTransform: "capitalize"}}>{e}</span>
        })}

        <div className="task" style={{gridColumn: "sunday", gridRow: "time-0500 / time-0700"}}>
          <h4 className="task-title">{props.title}</h4>
          <span className="task-time">8:00am - 9:00am</span><br/>
          <span className="task-day">Monday</span>
        </div>
        
      </div>

    </div>
  )
}