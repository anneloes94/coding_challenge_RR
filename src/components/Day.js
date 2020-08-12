import React from "react"
import Task from "./Task"

export default function Day(props) {
  const tasks = props.tasks.map((task, index) => {
    if (props.day.tasks.includes(task.id)) {
      return(
        <Task
          index={index}
          dayName={props.dayName}
          title={task.title}
          startTime={task.start_time}
          endTime={task.end_time}
        />
      )
    }
  })
    
  return(
    <>
      {tasks}
    </>
  )
}