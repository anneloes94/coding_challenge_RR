import React from "react";
import { convertToClockTime } from "../helpers/convertors"

export default function Task(props) {
  const gridTimePhrase = "time-" + props.startTime + " / time-" + props.endTime;
  const clockTimePhrase = convertToClockTime(props.startTime) + " - " + convertToClockTime(props.endTime)
  
  return(
    <div key={props.index} className="task" style={{gridColumn: props.dayName, gridRow: gridTimePhrase}}>
      <h4 className="task-title" style={{textTransform: "capitalize"}}>{props.title}</h4>
      <span className="task-time">{clockTimePhrase}</span><br/>
      <span className="task-day" style={{textTransform: "capitalize"}}>{props.dayName}</span>
    </div>
  )
}