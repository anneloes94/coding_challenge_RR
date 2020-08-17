import React, {useState} from "react";
import { connect } from "react-redux"
import { convertToClockTime, convertDayNumberToName } from "../helpers/convertors"
import "./Task.css";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PopUpForm from "./PopUpForm";

function Task({dispatch, id, title, driver, day, startTime, endTime}) {
  // Material UI functions & state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mode, setMode] = useState(undefined)

  const [showForm, setShowForm] = useState(false);

  function displayForm (mode) {
    setShowForm(!showForm)
    setMode(mode)
    handleClose()
  }

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
    <div key={id} className="task" style={{gridColumn: convertDayNumberToName(day), gridRow: gridTimePhrase}}>
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
          <MenuItem key={0} selected={true} onClick={() => {displayForm("Edit")}}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem key={1} selected={false} onClick={() => {displayForm("Delete")}}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </div>
      <h4 className="task-title" style={{textTransform: "capitalize"}}>{title}</h4>
      <span className="task-time">{clockTimePhrase}</span><br/>
      <span className="task-day" style={{textTransform: "capitalize"}}>{convertDayNumberToName(day)}</span>

      {showForm && 
        <PopUpForm
          task={{id, title, driver, day, startTime, endTime}}
          open={showForm}
          handleClose={displayForm}
          mode={mode}
        />
      }
    </div>
  )
}

const mapStateToProps = ({tasks, driver, week}) => {
  return {
    tasks,
    driver,
    week
  }
}

export default connect()(Task);
