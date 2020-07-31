import React from 'react';

import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import "./Header.css"

// Material-UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Header(props) {

  const classes = useStyles();
  const drivers = ["Michael Schumacher", "Michael Hamilton", "Max Verstappen"]
  const menuItems = drivers.map((driver, index) => <MenuItem key={index} value={driver}>{driver}</MenuItem>)
  const dayPeriodItems = [2, 4, 7, 14, 28].map((driver, index) => <MenuItem key={index} value={driver}>{driver} days</MenuItem>)

  const handleDriverChange = (event) => {
    props.changeDriver(event.target.value)
  }

  const handleWeekChange = (command) => {
    if (command === "up") {
      props.changeWeek(props.week + 1)
    } else if (command === "down") {
      props.changeWeek(props.week - 1)
    }
  }

  const handleDayPeriod = (event) => {

  }

  return(
    <div id="header">
      <div className="header-section driver-options" >
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Trucker name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={props.driver || ""}
            onChange={handleDriverChange}
            // onChange={console.log("hello")}
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>

      <div className="header-section weekDisplay">
      <button onClick={handleWeekChange("down")}>trashy down button</button>
        Week {props.week}
        <button onClick={handleWeekChange("up")}>trashy up button</button>
      </div>

      <div className="header-section downloadCSV">
        <p className="first">{props.driver}'s schedule per</p>
        <div className="second">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label"># of days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleDayPeriod}
            >
              {dayPeriodItems}
            </Select>
          </FormControl>
        </div>
        <div className="third">
          <Button variant="outlined" color="primary">
            CSV <i className="fa fa-download" aria-hidden="true"></i>
          </Button>
        </div>

      </div>
    </div>
  )
}