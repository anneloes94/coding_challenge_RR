import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import { convertToClockTime } from "../helpers/convertors";

// Options for task type
const tasks = ["pickup", "dropoff", "other"]
// Creates time array: [0000, ..., 2300]
let times = [];
const createTimes = () => {
  [...Array(24)].map((e,i) => {
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
  const [task, setTask] = useState(tasks[0]);
  const [startTime, setStartTime] = useState(1200);
  const [endTime, setEndTime] = useState(1300);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleStartingTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const submitForm = () => {
    // check 
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
        <div className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <h2>Add a new task</h2>
            <div>
              <TextField
                disabled
                id="trucker"
                label="Trucker"
                defaultValue={props.driver.name}
                variant="filled"
              />

              <TextField
                required
                id="week"
                label={"Week #"}
                defaultValue={props.week}
                helperText="Enter a week between 1 - 52"
                variant="outlined"
                onChange={(event) => props.setWeek(event.target.value)}
              />

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
            </div>
            <div>
              <TextField
                required
                id="starting-time"
                select
                label="Starting time"
                value={startTime}
                onChange={handleStartingTimeChange}
              >
                {times.map(time => (
                  <MenuItem key={time} value={time} >
                    {convertToClockTime(time)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
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
            </div>
            <button onSubmit={submitForm}>Create Task</button>
          </form>
        
        </div>
      </Fade>
    </Modal>
  );
}
