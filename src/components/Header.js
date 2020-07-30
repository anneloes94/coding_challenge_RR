import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Header(props) {
  const [drivers, setDrivers] = useState(["Michael Schumacher, Michael Hamilton, Max Verstappen"])
  return(
    <div style={{backgroundColor: "#E1E2E1"}}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">Trucker name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          {drivers.map(driver => (
            <MenuItem value={driver}>{driver}</MenuItem>
            )
          )}
        </Select>
      </FormControl>
      Week {props.week}
    </div>
  )
}