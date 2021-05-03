import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  List,
  Paper,
  Typography,
  IconButton,
  Grid,
  TextField,
  makeStyles,
  Divider,
  ClickAwayListener,
} from "@material-ui/core";
import { Edit, Add, Cancel } from "@material-ui/icons";
import DoneIcon from "@material-ui/icons/Done";
import { useParams } from "react-router-dom";

import {
  fetchTasks,
  deleteTaskThunk,
  updateListTitleThunk,
} from "../redux/tasks";

import TaskListItem from "./TaskListItem";
import AddTask from "./AddTask";
import AddTaskField from "./AddTaskField";

const useStyles = makeStyles({
  container: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  typ: {
    color: "#ffffff",
  },
  editIcons: {
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
  },
  rowBoxSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingLeft: "1.2em",
  },
});

const AllTasks = (props) => {
  const classes = useStyles();
  let { list } = props;
  const { listId } = useParams();
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState(list.title);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const handleSaveTitle = () => {
    if (title === "") {
      setErrorText("Please enter a title!");
      return;
    }
    props.updateList(list.id, { title });
    setEditTitleOpen(false);
    setShowAddIcon(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (title === "") {
        setErrorText("Edit your list's name or cancel!");
        return;
      }
      props.updateList(list.id, { title });
      setEditTitleOpen(false);
      setShowAddIcon(true);
    }
    if (e.keyCode === 27) {
      setEditTitleOpen(false);
      setShowAddIcon(true);
      setTitle(list.title);
    }
  };

  const handleClickAway = () => {
    console.log("HANDLED CLICK AWAY");
    setEditTitleOpen(false);
    setShowAddIcon(true);
    setTitle(list.title);
  };

  useEffect(() => {
    props.loadAllTasks(listId);
  }, []);

  useEffect(() => {
    setTitle(list.title);
  }, [list]);

  return (
    <div>
      {/* <Grid container direction="row"> */}

      <div className={classes.rowBoxSpaceBetween}>
        {/* <Grid item> */}
        {!editTitleOpen && (
          <Typography className={classes.typ} variant="h5">
            {title}
          </Typography>
        )}
        {editTitleOpen && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <TextField
              variant="outlined"
              defaultValue={title}
              autoFocus
              // fullWidth
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
        {/* </Grid> */}
        {/* <Grid item> */}
        {!editTitleOpen && (
          <IconButton
            className={classes.greenIcons}
            onClick={() => {
              setEditTitleOpen(true);
              setTimeout(() => {
                setShowAddIcon(false);
              }, 0);
              setErrorText("");
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        )}

        {editTitleOpen && (
          <div>
            <IconButton
              className={classes.greenIcons}
              onClick={handleSaveTitle}
              disabled={!title}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              className={classes.redIcons}
              onClick={() => {
                setEditTitleOpen(false);
                setShowAddIcon(true);
                setTitle(list.title);
              }}
            >
              <Cancel />
            </IconButton>
          </div>
        )}
        {/* </Grid> */}
      </div>
      {/* </ClickAwayListener> */}
      {/* </Grid> */}
      <Divider></Divider>

      <Paper>
        <List className={classes.container}>
          {list.tasks
            .sort((a, b) => {
              if (a.completed === true && b.completed === false) {
                return 1;
              } else if (a.completed === b.completed) {
                return 0;
              } else {
                return -1;
              }
            })
            .map((task) => {
              return (
                <div key={task.id}>
                  <TaskListItem task={task} setShowAddIcon={setShowAddIcon} />
                  <Divider />
                </div>
              );
            })}
        </List>
        {addTaskOpen && (
          <AddTaskField
            setAddTaskOpen={setAddTaskOpen}
            setShowAddIcon={setShowAddIcon}
          />
        )}
      </Paper>
      {showAddIcon && (
        <IconButton
          className={classes.greenIcons}
          onClick={() => {
            setAddTaskOpen(true);
            setShowAddIcon(false);
          }}
        >
          <Add fontSize="large" />
        </IconButton>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllTasks: async (id) => await dispatch(fetchTasks(id)),
    deleteTask: (id) => dispatch(deleteTaskThunk(id)),
    updateList: (id, list) => dispatch(updateListTitleThunk(id, list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks);
