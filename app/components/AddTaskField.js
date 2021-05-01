import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, IconButton, makeStyles } from "@material-ui/core";
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
  };

  const handleCancel = () => {
    setTaskName("");
    props.setAddTaskOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
    }
    if (e.keyCode === 27) {
      props.setAddTaskOpen(false);
    }
  };

  return (
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
      <IconButton onClick={handleAddTask} className={classes.greenIcons}>
        <Done />
      </IconButton>
      <IconButton onClick={handleCancel} className={classes.redIcons}>
        <Cancel />
      </IconButton>
    </div>
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
