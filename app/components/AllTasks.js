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
} from "@material-ui/core";
import { Edit, Add } from "@material-ui/icons";
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
});

const AllTasks = (props) => {
  const classes = useStyles();
  let { list } = props;
  const { listId } = useParams();
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  const handleSaveTitle = () => {
    props.updateList(list.id, { title });
    setEditTitleOpen(false);
  };

  useEffect(() => {
    props.loadAllTasks(listId);
  }, []);

  useEffect(() => {
    setTitle(list.title);
  }, [list]);

  return (
    <div>
      <Grid container direction="row">
        <Grid item>
          {!editTitleOpen && (
            <Typography className={classes.typ} variant="h3">
              {title}
            </Typography>
          )}
          {editTitleOpen && (
            <TextField
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          )}
        </Grid>
        <Grid item>
          {!editTitleOpen && (
            <IconButton
              className={classes.greenIcons}
              onClick={() => {
                setEditTitleOpen(true);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          )}

          {editTitleOpen && (
            <IconButton
              className={classes.greenIcons}
              onClick={handleSaveTitle}
            >
              <DoneIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

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
                  <TaskListItem task={task} />
                  <Divider />
                </div>
              );
            })}
        </List>
        {addTaskOpen && <AddTaskField setAddTaskOpen={setAddTaskOpen} />}
        <IconButton
          className={classes.greenIcons}
          onClick={() => setAddTaskOpen(true)}
        >
          <Add fontSize="large" />
        </IconButton>
      </Paper>
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
