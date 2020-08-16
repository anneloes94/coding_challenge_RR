import React from "react";
import { convertToClockTime, convertDayNumberToName } from "../helpers/convertors"
import "./Task.css"
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Task({id, title, driver, day, startTime, endTime}) {
  // Material UI functions & state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  // *** 

  const gridTimePhrase = "time-" + startTime + " / time-" + endTime;
  const clockTimePhrase = convertToClockTime(startTime) + " - " + convertToClockTime(endTime)
  
  return(
    <div key={id} className="task" style={{gridColumn: "sunday", gridRow: gridTimePhrase}}>
      <div class="action-buttons">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '19ch',
            },
          }}
        >
          <MenuItem key={0} selected={true} onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem key={1} selected={false} onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </div>
      <h4 className="task-title" style={{textTransform: "capitalize"}}>{title}</h4>
      <span className="task-time">{clockTimePhrase}</span><br/>
    </div>
  )
}