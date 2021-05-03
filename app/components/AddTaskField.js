import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  TextField,
  IconButton,
  makeStyles,
  ClickAwayListener,
} from "@material-ui/core";
import { Done, Cancel } from "@material-ui/icons";

import { postTask } from "../redux/tasks";

const useStyles = makeStyles({
  txtfld: {
    margin: 20,
  },
  greenIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "green",
    },
  },
  redIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "red",
    },
  },
  rowBoxSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  rowBox: {
    display: "flex",
  },
});

const AddTaskField = (props) => {
  const classes = useStyles();
  const [taskName, setTaskName] = useState("");
  const [textfieldIsOpen, setTextfieldIsOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const { listId } = useParams();

  const handleAddTask = () => {
    //TODO: remove description
    if (taskName === "") {
      setErrorText("Add an Item or Cancel");
      return;
    }
    const task = {
      title: taskName,
      completed: false,
    };
    props.addNewTask(task, listId);
    props.setAddTaskOpen(false);
    props.setShowAddIcon(true);
  };

  const handleCancel = () => {
    setTaskName("");
    props.setAddTaskOpen(false);
    props.setShowAddIcon(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (taskName === "") {
        setErrorText("Add a list item or cancel!");
        return;
      }
      const task = {
        title: taskName,
        completed: false,
      };
      props.addNewTask(task, listId);
      props.setAddTaskOpen(false);
      props.setShowAddIcon(true);
    }
    if (e.keyCode === 27) {
      props.setAddTaskOpen(false);
      props.setShowAddIcon(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <div className={classes.rowBoxSpaceBetween}>
        <TextField
          variant="outlined"
          label="List Item"
          className={classes.txtfld}
          fullWidth
          autoFocus
          defaultValue={taskName}
          error={errorText.length ? true : false}
          helperText={errorText}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setErrorText("");
            setTaskName(event.target.value);
          }}
        />
        <IconButton
          onClick={handleAddTask}
          className={classes.greenIcons}
          disabled={!taskName}
        >
          <Done />
        </IconButton>
        <IconButton onClick={handleCancel} className={classes.redIcons}>
          <Cancel />
        </IconButton>
      </div>
    </ClickAwayListener>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addNewTask: (task, listId) => {
      dispatch(postTask(task, listId));
    },
  };
};

export default connect(null, mapDispatch)(AddTaskField);
