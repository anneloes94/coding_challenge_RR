import React from "react";
import "./Schedule.css"

export default function Task(props) {
  return(
    <div key={props.index} className="task" style={{gridColumn: props.dayName, gridRow: props.timePhrase}}>
      {console.log(props.timePhrase)}
      <h4 className="task-title" style={{textTransform: "capitalize"}}>{props.title}</h4>
      <span className="task-time">8:00am - 9:00am</span><br/>
      <span className="task-day" style={{textTransform: "capitalize"}}>{props.dayName}</span>
    </div>
  )
}