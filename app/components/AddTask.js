import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { postTask } from "../redux/tasks";

const AddTask = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { listId } = useParams();

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSubmitTask = () => {
    const task = {
      title,
      description,
      completed: false,
    };
    props.addNewTask(task, listId);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmitTask();
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpenDialog}>
        <Add />
      </IconButton>
      <Dialog
        onBackdropClick={handleCancel}
        onEscapeKeyDown={handleCancel}
        open={open}
      >
        <DialogTitle>Add A New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="title"
            fullWidth
            onKeyPress={onEnter}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="description"
            fullWidth
            onKeyPress={onEnter}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addNewTask: (task, id) => {
      dispatch(postTask(task, id));
    },
  };
};

export default connect(null, mapDispatch)(AddTask);
