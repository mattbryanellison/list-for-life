import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  ListItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  IconButton,
  Grid,
  TextField,
  Divider,
  ClickAwayListener,
  Snackbar,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import {
  Info,
  Edit,
  Done,
  DeleteForever,
  Close,
  Cancel,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

import InfoDialog from "./InfoDialog";
import EditDialog from "./EditDialog";
import { putTask, deleteTaskThunk } from "../redux/tasks";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
  },
  typ: {
    color: "#ffffff",
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
  spacer: {
    flexGrow: 1,
  },
  rowBoxItemWide: {
    display: "flex",
    width: "100%",
  },
  rowBoxItem: {
    display: "flex",
    flexDirection: "row",
  },
  rowBox: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#2b2b2b",
  },
}));

const TaskListItem = (props) => {
  const classes = useStyles();
  const { task } = props;
  const { listId } = useParams();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [errorText, setErrorText] = useState("");
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);

  const checkboxHandler = (event) => {
    if (!editTitleOpen) {
      props.updateTask(listId, task.id, {
        completed: !completed,
      });
    }
  };

  const submitUpdateHandler = () => {
    if (title === "") {
      setErrorText("Please enter a title!");
      return;
    }
    props.updateTask(listId, task.id, {
      title,
    });
    setEditTitleOpen(false);
    props.setShowAddIcon(true);
  };

  const onDeleteHandler = () => {
    setDialogIsOpen(false);
    props.deleteTask(listId, task.id);
    setEditTitleOpen(false);
    props.setShowAddIcon(true);
  };

  const blurActive = () => {
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      onDeleteHandler();
      // setDialogIsOpen(false);
      // props.deleteTask(listId, task.id);
      // setEditTitleOpen(false);
      // props.setShowAddIcon(true);
    }
    if (e.keyCode === 27) {
      setDialogIsOpen(false);
      setEditTitleOpen(false);
      props.setShowAddIcon(true);
      blurActive();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (title === "") {
        setErrorText("Please enter a title!");
        return;
      }
      props.updateTask(listId, task.id, {
        title,
      });
      setEditTitleOpen(false);
      props.setShowAddIcon(true);
    }

    if (e.keyCode === 27) {
      setEditTitleOpen(false);
      props.setShowAddIcon(true);
      setTitle(task.title);
    }
  };

  const handleClickAway = () => {
    console.log("HANDLE click away");
    setEditTitleOpen(false);
    props.setShowAddIcon(true);
    setTitle(task.title);
  };

  const handleDialogOpen = () => {
    setDialogIsOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.rowBox}>
        <div className={classes.rowBoxItemWide}>
          <ListItem button={!editTitleOpen} onClick={checkboxHandler}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={editTitleOpen}
                    className={classes.typ}
                    checked={completed}
                    onChange={checkboxHandler}
                  />
                }
              />
            </FormGroup>
            {!editTitleOpen && (
              <Typography className={classes.typ} variant="body1">
                {title}
              </Typography>
            )}
            {editTitleOpen && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <TextField
                  variant="outlined"
                  autoFocus={true}
                  defaultValue={title}
                  onKeyDown={handleKeyDown}
                  error={errorText.length ? true : false}
                  helperText={errorText}
                  onChange={(event) => {
                    setErrorText("");
                    setTitle(event.target.value);
                  }}
                />
              </ClickAwayListener>
            )}
          </ListItem>
        </div>

        <div className={classes.rowBoxItem}>
          {!editTitleOpen && (
            <div className={classes.rowBoxItem}>
              <IconButton
                variant="contained"
                className={classes.greenIcons}
                onClick={() => {
                  setEditTitleOpen(true);
                  setTimeout(() => {
                    props.setShowAddIcon(false);
                  }, 0);
                  setErrorText("");
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                className={classes.redIcons}
                onClick={handleDialogOpen}
              >
                <DeleteForever fontSize="small" />
              </IconButton>

              {/* what would be the reason to handle the delete in the onClose prop of the outer dialog component, rather than the onClick of the button? */}

              <Dialog
                onClose={() => {}}
                open={dialogIsOpen}
                onKeyUp={handleKeyUp}
              >
                <DialogTitle id="delete-confirmation">
                  <Typography align="center">Are you sure?</Typography>
                </DialogTitle>
                <DialogActions>
                  <Button
                    variant="contained"
                    fullWidth={false}
                    onClick={onDeleteHandler}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth={false}
                    onClick={() => {
                      setDialogIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}

          {editTitleOpen && (
            <div className={classes.rowBoxItem}>
              <IconButton
                className={classes.greenIcons}
                onClick={submitUpdateHandler}
                disabled={!title}
              >
                <Done />
              </IconButton>
              <IconButton
                className={classes.redIcons}
                onClick={() => {
                  setEditTitleOpen(false);
                  props.setShowAddIcon(true);
                  setTitle(task.title);
                }}
              >
                <Cancel />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    updateTask: (listId, taskId, task) => {
      dispatch(putTask(listId, taskId, task));
    },
    deleteTask: (listId, taskId) => {
      dispatch(deleteTaskThunk(listId, taskId));
    },
  };
};

export default connect(null, mapDispatch)(TaskListItem);
