import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux"
import { TextField, Modal, Backdrop, Fade, MenuItem, Button } from "@material-ui/core";
import { convertToClockTime, convertDayNumberToName } from "../helpers/convertors";
import "./PopUpForm.css"
import { dayNames, tasks, times } from "../variables";
import { setWeek } from "../actions/week"
import { addTask } from "../actions/tasks";
import { getVisibleTasks } from "../selectors/tasks"

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

function PopUpForm({dispatch, open, handleClose, mode, driver, week, filteredTasks}) {
  const classes = useStyles();

  // State for form data
  const [task, setTask] = useState(tasks[0]);
  const [startTime, setStartTime] = useState("1200");
  const [endTime, setEndTime] = useState("1300");
  const [day, setDay] = useState(1)
  const [errors, setError] = useState([])
  const [warning, showWarning] = useState(false)
  const [timeConflict, setTimeConflict] = useState(false)

  // If the week is incorrect, add error to errors state (if not there already)
  // Otherwise, remove error from errors and change the state of week to current value
  const handleWeekChange = (event) => {
    if (event.target.value < 1 || event.target.value > 52) {
      !errors.includes("invalidWeek") && setError(errors => [...errors, "invalidWeek"])
    } else {
      setError(errors.filter(error => error !== "invalidWeek"))
      dispatch(setWeek(event.target.value))
    }
  }

  // REFACTOR
  const handleDayChange = (event) => {
    setDay(event.target.value);
  }

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleStartingTimeChange = (event) => {
    setStartTime(event.target.value);
    setTimeConflict(false);
  };
  // ---

  const handleEndTimeChange = (event) => {
    if (Number(startTime) >= Number(event.target.value)) {
      setError(errors => [...errors, "timeError"])
    } else {
      setError(errors.filter(error => error !== "timeError"))
    }
    setEndTime(event.target.value);
    setTimeConflict(false);
  };

  const checkFormData = () => {
    // check whether there are no errors in form and driver is set
    if (errors.length === 0 && driver.name) {
      showWarning(false)
      
      // convert week/weekday to dayNumber (for days state)
      const dayInWeek = dayNames.indexOf(day) + 1
      const formDayNumber = (week - 1) * 7 + dayInWeek
      
      // we now have all variables - call submitFormData
      submitFormData({title: task, driver: driver.id, day, startTime, endTime})
    } else {
      console.log("booo")
      showWarning(true)
    }
  }
  
  const submitFormData = (task) => {
    // check if current time has conflict with any of filteredTasks
    let submitTask = true;

    filteredTasks.forEach(filteredTask => {
      // if filteredTask's day is similar to task's, keep digging:
      if (filteredTask.day === task.day) {
        // in the array of times ["0000", "0100", ...], get the range of the filteredTask's startTime/endTime:
        const beginningOfRange = times.indexOf(filteredTask.startTime)
        const endOfRange = times.indexOf(filteredTask.endTime)
        // now get the position of the submitted task in that array
        const indexOfStartTime = times.indexOf(task.startTime)
        const indexOfEndTime = times.indexOf(task.endTime)
        // if task's startTime or endTime is between filteredTask's startTime/endTime, giver error:
        if ((indexOfStartTime >= beginningOfRange && indexOfStartTime < endOfRange ) || (
          indexOfEndTime > beginningOfRange && indexOfStartTime < endOfRange
        )){
          console.log("nooo don't do this")
          setTimeConflict(true)
          submitTask = false;
        }
      }
    })
      // else: 
    submitTask && dispatch(addTask(task))
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper} id="form" >
          {warning && 
            <div class="warning">
              <span>Please review your entry below</span>
            </div>
          }
          {timeConflict && 
            <div class="warning">
              <span>Your task could not be submitted due to a <b>time conflict</b>. Please select a different time.</span>
            </div>
          }
          <form className={classes.root} noValidate autoComplete="off">
            <h2 className="form-element" >{mode} a task</h2>
            <div>
              <TextField
                error={!driver.name}
                disabled
                id="trucker"
                label="Trucker"
                defaultValue={driver.name}
                variant="filled"
              />

              <TextField
                error={errors.includes("invalidWeek")}
                required
                id="week"
                label={"Week #"}
                defaultValue={week}
                helperText="Enter a week between 1 - 52"
                variant="outlined"
                onChange={handleWeekChange}
              />

              <TextField
                required
                id="day"
                select
                label={"Day"}
                defaultValue={day}
                helperText="Select a day"
                onChange={handleDayChange}
              >
                {dayNames.map((dayName, index) => (
                  <MenuItem key={index} value={(week - 1) * 7 + index + 1} style={{textTransform:"capitalize"}}>
                    {dayName}
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
                <Button onClick={checkFormData} variant="outlined" color="primary">
                  {mode} Task
                </Button>
              </div>
            </div>
            
          </form>
        
        </div>
      </Fade>
    </Modal>
  );
}

const mapStateToProps = (({tasks, driver, week}) => {
  return {
    driver,
    week,
    filteredTasks: getVisibleTasks(tasks, driver, week)
  }
});

export default connect(mapStateToProps)(PopUpForm);