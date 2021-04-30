import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, IconButton } from "@material-ui/core";
import { Done, Cancel } from "@material-ui/icons";

import { postTask } from "../redux/tasks";

const AddTaskField = (props) => {
  const [taskName, setTaskName] = useState("");
  const { listId } = useParams();

  const handleAddTask = () => {
    //TODO: remove description
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

  return (
    <div>
      <TextField
        autoFocus
        defaultValue={taskName}
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
      />
      <IconButton onClick={handleAddTask}>
        <Done />
      </IconButton>
      <IconButton onClick={handleCancel}>
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
