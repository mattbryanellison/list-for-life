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
  makeStyles,
} from "@material-ui/core";
import { Add, Done, Cancel } from "@material-ui/icons";

import { postTask } from "../redux/tasks";

const useStyles = makeStyles({
  typ: {
    color: "#ffffcc",
  },
  greenIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "#66ff33",
    },
  },
  redIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "#ff0000",
    },
  },
});

const AddTask = (props) => {
  const classes = useStyles();
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
      {/* <Button className={classes.btn} onClick={handleOpenDialog}>
        <Typography className={classes.typ}>Add</Typography>
      </Button> */}
      <IconButton onClick={handleOpenDialog}>
        <Add fontSize="large" />
      </IconButton>
      <Dialog
        onBackdropClick={handleCancel}
        onEscapeKeyDown={handleCancel}
        open={open}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label=""
            type="title"
            fullWidth
            onKeyPress={onEnter}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleSubmitTask}>
            <Done />
          </IconButton>
          {/* <Button onClick={handleSubmitTask} color="primary">
            Add
          </Button> */}
          <IconButton onClick={handleCancel}>
            <Cancel />
          </IconButton>
          {/* <Button onClick={handleCancel} color="primary">
            Cancel
          </Button> */}
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
