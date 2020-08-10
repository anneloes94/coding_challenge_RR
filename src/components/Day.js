import React from "react"
import Task from "./Task"

export default function Day(props) {
  const tasks = props.tasks.map((task, index) => {
    let timePhrase = "time-" + task.start_time + " / time-" + task.end_time;
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
    <>
      {tasks}
    </>
  )
}