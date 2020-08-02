import React from "react";

export default function Task(props) {
    let tempVar = (
      <div key={props.index} className="task" style={{gridColumn: props.dayName, gridRow: props.timePhrase}}>
        <h4 className="task-title">{props.title}</h4>
        <span className="task-time">8:00am - 9:00am</span><br/>
        <span className="task-day" style={{textTransform: "capitalize"}}>{props.dayName}</span>
      </div>)
    console.log("bwaah")
  return(
    {tempVar}
  )
}