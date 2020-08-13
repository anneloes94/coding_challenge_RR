// In ADD mode, we have access to:
// - driver state
// - week state
// - setWeek
// - mode

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Modal, Backdrop, Fade, MenuItem, Button } from "@material-ui/core";
import { convertToClockTime } from "../helpers/convertors";
import "./PopUpForm.css"

// Options for task type
const tasks = ["pickup", "dropoff", "other"]
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// Creates time array: [0000, ..., 2300]
  // #TODO => refactor  
let times = [];
const createTimes = () => {
  [...Array(25)].map((e,i) => {
    let time;
    if (i < 10) {
      time = "0" + i;
    } else {
      time = i;
    }
    time += "00"
    times.push(time);
  })
}
createTimes()

// Material UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// ***

export default function PopUpForm(props) {
  const classes = useStyles();

  // State for form data
  const [task, setTask] = useState(tasks[0]);
  const [startTime, setStartTime] = useState("1200");
  const [endTime, setEndTime] = useState("1300");
  const [day, setDay] = useState(days[0])
  const [errors, setError] = useState([])

  // If the week is incorrect, add error to errors state (if not there already)
  // Otherwise, remove error from errors and change the state of week to current value
  const handleWeekChange = (event) => {
    if (event.target.value < 1 || event.target.value > 52) {
      !errors.includes("invalidWeek") && setError(errors => [...errors, "invalidWeek"])
    } else {
      setError(errors.filter(error => error !== "invalidWeek"))
      props.setWeek(event.target.value)
    }
  }

  const handleDayChange = (event) => {
    setDay(event.target.value);
  }

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleStartingTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    if (Number(startTime) >= Number(event.target.value)) {
      setError(errors => [...errors, "timeError"])
    } else {
      setError(errors.filter(error => error !== "timeError"))
    }
    setEndTime(event.target.value);
  };

  const checkFormData = () => {
    // check whether no errors and driver
    if (errors.length === 0 && props.driver.name) {
      console.log("yay!")
    } else {
      console.log("boooo")
    }
    // convert week/weekday to day
    // check whether time is available
    // submitFormData()
  }
  
  const submitFormData = () => {
    // alter state (setTask(), setDay()) with data
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={() => props.handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper} id="form" >
          <form className={classes.root} noValidate autoComplete="off">
            <h2 className="form-element" >{props.mode} a task</h2>
            <div>
              <TextField
                error={!props.driver.name}
                disabled
                id="trucker"
                label="Trucker"
                defaultValue={props.driver.name}
                variant="filled"
              />

              <TextField
                error={errors.includes("invalidWeek")}
                required
                id="week"
                label={"Week #"}
                defaultValue={props.week}
                helperText="Enter a week between 1 - 52"
                variant="outlined"
                onChange={handleWeekChange}
              />

              <TextField
                required
                id="day"
                select
                label={"Day"}
                value={day}
                helperText="Select a day"
                onChange={handleDayChange}
              >
                {days.map(day => (
                  <MenuItem key={day} value={day} style={{textTransform:"capitalize"}}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
              </div>
              <div>

              <TextField
                required
                id="task"
                select
                label="Task"
                value={task}
                onChange={handleTaskChange}
              >
                {tasks.map(task => (
                  <MenuItem key={task} value={task} style={{textTransform:"capitalize"}}>
                    {task}
                  </MenuItem>
                ))}
              </TextField>
            
              <TextField
                error={errors.includes("timeError")}
                required
                id="starting-time"
                select
                label="Starting time"
                value={startTime}
                onChange={handleStartingTimeChange}
              >
                {times.slice(0, -1).map(time => (
                  <MenuItem key={time} value={time} >
                    {convertToClockTime(time)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                error={errors.includes("timeError")}
                required
                id="end-time"
                select
                label="Ending time"
                value={endTime}
                onChange={handleEndTimeChange}
              >
                {times.map(time => (
                  <MenuItem key={time} value={time} >
                    {convertToClockTime(time)}
                  </MenuItem>
                ))}
              </TextField>
              <div className="button-wrapper">
                <Button onSubmit={checkFormData} variant="outlined" color="primary">
                  {props.mode} Task
                </Button>
              </div>
            </div>
            
          </form>
        
        </div>
      </Fade>
    </Modal>
  );
}
