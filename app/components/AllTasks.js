import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  List,
  Paper,
  Typography,
  IconButton,
  Grid,
  GridItem,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import DoneIcon from "@material-ui/icons/Done";
import { useParams } from "react-router-dom";

import history from "../history";
import {
  fetchTasks,
  deleteTaskThunk,
  updateListTitleThunk,
} from "../redux/tasks";
import { putList } from "../redux/lists";
import TaskListItem from "./TaskListItem";
import AddTask from "./AddTask";

const AllTasks = (props) => {
  let { list } = props;
  const { listId } = useParams();
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const [title, setTitle] = useState(list.title);

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
          {!editTitleOpen && <Typography variant="h4">{title}</Typography>}
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
              onClick={() => {
                setEditTitleOpen(true);
              }}
            >
              <Edit />
            </IconButton>
          )}

          {editTitleOpen && (
            <IconButton onClick={handleSaveTitle}>
              <DoneIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

      <Paper>
        <List>
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
              return <TaskListItem task={task} key={task.id} />;
            })}
        </List>
        <AddTask />
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
