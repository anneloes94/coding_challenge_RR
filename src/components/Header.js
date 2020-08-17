import React, { useState } from 'react';
import { connect } from "react-redux"
import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import {drivers, dayPeriods} from "../variables"
import "./Header.css"
import setDriver from "../actions/driver"
import { incrementWeek, decrementWeek } from '../actions/week';

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

function Header({dispatch, driver, week}) {
  const classes = useStyles();

  const menuItems = drivers.map((driver, index) => <MenuItem key={index} value={driver.id}>{driver.name}</MenuItem>)
  const dayPeriodItems = dayPeriods.map((driver, index) => <MenuItem key={index} value={driver}>{driver} days</MenuItem>)
  const [hasNoEntry, setEntry] = useState(true)

  const handleDriverChange = (event) => {
    let newDriverObject = drivers.filter(driver => driver.id === event.target.value)
    dispatch(setDriver(newDriverObject[0]))
    setEntry(false)
  }

  const handleWeekChange = (input) => {
    if (input === "up") {
      dispatch(incrementWeek())
    } else if (input === "down") {
      dispatch(decrementWeek())
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
        {week !== 1 && <button className="week-button" onClick={() => handleWeekChange("down")}><i className="fas fa-angle-left"></i></button>}
        </div>
        <div>
          Week {week}
        </div>
        <div>
        {week !== 52 && <button className="week-button" onClick={() => handleWeekChange("up")}><i className="fas fa-angle-right"></i></button>}
        </div>
      </div>

      <div className="header-section downloadCSV">
        {driver.name && <p className="first">{driver.name}'s schedule per</p>}
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