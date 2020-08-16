import React, { useState } from 'react';
import { connect } from "react-redux"
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {drivers, dayPeriods} from "../variables"
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

function Header(props) {
  const classes = useStyles();

  const menuItems = drivers.map((driver, index) => <MenuItem key={index} value={driver.id}>{driver.name}</MenuItem>)
  const dayPeriodItems = dayPeriods.map((driver, index) => <MenuItem key={index} value={driver}>{driver} days</MenuItem>)
  const [hasNoEntry, setEntry] = useState(true)

  const handleDriverChange = (event) => {
    let newDriverObject = drivers.filter(driver => driver.id === event.target.value)
    props.changeDriver(newDriverObject[0])
    setEntry(false)
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
            error={hasNoEntry}
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
        <div>
        {props.week !== 1 && <button className="week-button" onClick={() => handleWeekChange("down")}><i className="fas fa-angle-left"></i></button>}
        </div>
        <div>
          Week {props.week}
        </div>
        <div>
        {props.week !== 52 && <button className="week-button" onClick={() => handleWeekChange("up")}><i className="fas fa-angle-right"></i></button>}
        </div>
      </div>

      <div className="header-section downloadCSV">
        {props.driver.name && <p className="first">{props.driver.name}'s schedule per</p>}
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

const ConnectedHeader = connect((state) => {
  return {
    driver: state.driver,
    week: state.week
  }
})(Header)

export default ConnectedHeader;