import React from "react"
import Task from "./Task"

export default function Day(props) {
    
  return(
    props.tasks && props.days && props.days.map((day) => {
      let dayName = day.name;
      props.tasks.map((task, index) => {
        let timePhrase = "time-" + task.start_time + " / time-" + task.end_time;
        console.log("hello")
        return(
          <Task
            index={index}
            dayName={dayName}
            timePhrase={timePhrase}
            title={task.title}
          />
        )
      })
    })

  )
}