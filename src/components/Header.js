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
  const drivers = [
    {
      id: 1,
      name: "Michael Schumacher"
    },
    {
      id: 2,
      name: "Lewis Hamilton"
    },
    {
      id: 3,
      name: "Max Verstappen"
    }
  ]
  const menuItems = drivers.map((driver, index) => <MenuItem key={index} value={driver.id}>{driver.name}</MenuItem>)
  const dayPeriodItems = [2, 4, 7, 14, 28].map((driver, index) => <MenuItem key={index} value={driver}>{driver} days</MenuItem>)

  const handleDriverChange = (event) => {
    let newDriverObject = drivers.filter(driver => driver.id === event.target.value)
    console.log(newDriverObject[0])
    props.changeDriver(newDriverObject[0])
  }

  const handleWeekChange = (input) => {
    if (input === "up") {
      props.changeWeek(props.week + 1)
    } else if (input === "down") {
      props.changeWeek(props.week - 1)
    }
  }

  const handleDayPeriodChange = (event) => {
    // getCSV(event.target.value)
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
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>

      <div className="header-section weekDisplay">
        {props.week !== 1 && <button onClick={() => handleWeekChange("down")}>\/</button>}
          Week {props.week}
        {props.week !== 52 && <button onClick={() => handleWeekChange("up")}>/\</button>}
      </div>

      <div className="header-section downloadCSV">
        {props.driver && <p className="first">{props.driver.name}'s schedule per</p>}
        <div className="second">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label"># of days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleDayPeriodChange}
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