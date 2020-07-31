import React, {useState} from 'react';

import { InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

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
  const menuItems = drivers.map(driver => <MenuItem value={driver}>{driver}</MenuItem>)
  const dayPeriodItems = [2, 4, 7, 14, 28].map(driver => <MenuItem value={driver}>{driver} days</MenuItem>)

  return(
    <div id="header">
      <div className="header-section driver-options" >
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Trucker name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            {menuItems}
          </Select>
        </FormControl>
      </div>

      <div className="header-section weekDisplay">
        Week {props.week}
      </div>

      <div className="header-section downloadCSV">
        <p class="first">{props.driver}'s schedule per</p>
        <div class="second">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label"># of days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              {dayPeriodItems}
            </Select>
          </FormControl>
        </div>
        <div class="third">
          <Button variant="outlined" color="primary">
            CSV <i class="fa fa-download" aria-hidden="true"></i>
          </Button>
        </div>

      </div>
    </div>
  )
}