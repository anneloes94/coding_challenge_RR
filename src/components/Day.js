import React from "react"
import Task from "./Task"

export default function Day(props) {
  const tasks = props.tasks.map((task, index) => {
    let timePhrase = "time-" + task.start_time + " / time-" + task.end_time;
    console.log("hello")
    return(
      <Task
        index={index}
        dayName={props.dayName}
        timePhrase={timePhrase}
        title={task.title}
      />
    )
  })
    
  return(
    <div>
      {tasks.map(task => <div>{task}</div>)}
    </div>
  )
}