import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux"
import { TextField, Modal, Backdrop, Fade, MenuItem, Button } from "@material-ui/core";
import { convertToClockTime, convertDayNumberToName } from "../helpers/convertors";
import "./PopUpForm.css"
import { dayNames, tasks, times } from "../variables";
import { setWeek } from "../actions/week"
import { addTask, editTask, deleteTask } from "../actions/tasks";
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

function PopUpForm({task, dispatch, open, handleClose, mode, driver, week, filteredTasks}) {
  const classes = useStyles();

  // State for form data
  const [taskName, setTaskName] = useState(task === undefined ? tasks[0] : task.title);
  const [startTime, setStartTime] = useState(task === undefined ? "1200" : task.startTime);
  const [endTime, setEndTime] = useState(task === undefined ? "1300" : task.endTime);
  const [day, setDay] = useState(task === undefined ? 1 : task.day)
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

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
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
    if (mode === "Delete") {
      submitFormData(task.id)
    } else {
      // check whether there are no errors in form and driver is set
      if (errors.length === 0 && driver.name) {
        showWarning(false)
        
        // we now have all variables - call submitFormData
        submitFormData({title: taskName, driver: driver.id, day, startTime, endTime})
      } else {
        showWarning(true)
      }
    }
  }
  
  const submitFormData = (submittedTask) => {
    // check if current time has conflict with any of filteredTasks
    let submitTask = true;

    mode !== "Delete" && 
      filteredTasks.forEach(filteredTask => {
        // if filteredTask's day is similar to task's, keep digging:
        if (filteredTask.day === submittedTask.day && filteredTask.id !== task.id) {
          // in the array of times ["0000", "0100", ...], get the range of the filteredTask's startTime/endTime:
          const beginningOfRange = times.indexOf(filteredTask.startTime)
          const endOfRange = times.indexOf(filteredTask.endTime)
          // now get the position of the submitted task in that array
          const indexOfStartTime = times.indexOf(submittedTask.startTime)
          const indexOfEndTime = times.indexOf(submittedTask.endTime)
          // if submittedTask's startTime or endTime is between filteredTask's startTime/endTime, giver error:
          if ((indexOfStartTime >= beginningOfRange && indexOfStartTime < endOfRange ) || (
            indexOfEndTime > beginningOfRange && indexOfStartTime < endOfRange
          )){
            setTimeConflict(true)
            submitTask = false;
          }
        }
      })

      // else: 
    mode === "Add" && submitTask && dispatch(addTask(task))
    mode === "Edit" && submitTask && console.log("here: ", submittedTask, task.id) && dispatch(editTask(task.id, submittedTask))
    mode === "Delete" && dispatch(deleteTask(task))
    !timeConflict && handleClose()
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

          {(mode === "Add" || mode === "Edit") &&
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
                value={taskName}
                onChange={handleTaskNameChange}
              >
                {tasks.map(taskName => (
                  <MenuItem key={taskName} value={taskName} style={{textTransform:"capitalize"}}>
                    {taskName}
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
            </div>
            
          </form>}

          {mode === "Delete" && 
          <div>
            <h3>Are you sure you want to delete this task?</h3>
          </div>}
        
          <div className="button-wrapper">
            <Button onClick={() => handleClose()} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={checkFormData} variant="contained" color="primary">
              {mode} Task
            </Button>
          </div>

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