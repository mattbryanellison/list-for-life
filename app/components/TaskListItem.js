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
} from "@material-ui/core";
import { Info, Edit, Done, DeleteForever } from "@material-ui/icons";

import InfoDialog from "./InfoDialog";
import EditDialog from "./EditDialog";
import { putTask, deleteTaskThunk } from "../redux/tasks";

const useStyles = makeStyles((theme) => ({
  spacer: {
    flexGrow: 1,
  },
  div: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  div2: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    justifyContent: "space-between",
  },
}));

const TaskListItem = (props) => {
  const classes = useStyles();
  const { task } = props;
  const { listId } = useParams();
  // const [editDialogIsOpen, openEditDialog] = useState(false);
  // const [infoDialogIsOpen, openInfoDialog] = useState(false);
  const [editTitleOpen, setEditTitleOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  // const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);

  const checkboxHandler = (event) => {
    props.updateTask(listId, task.id, {
      completed: !completed,
    });
  };

  const submitUpdateHandler = () => {
    props.updateTask(listId, task.id, {
      title,
    });
    setEditTitleOpen(false);
  };

  const onDeleteHandler = () => {
    props.deleteTask(listId, task.id);
    setEditTitleOpen(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      submitUpdateHandler();
    }
  };

  return (
    <div>
      {/* <Grid container direction="row" justify="space-between"> */}
      <div className={classes.div2}>
        {/* <Grid container direction="row"> */}
        <div className={classes.div}>
          <Grid item>
            <ListItem button onClick={checkboxHandler}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={completed} onChange={checkboxHandler} />
                  }
                />
              </FormGroup>
              {!editTitleOpen && <Typography variant="h4">{title}</Typography>}
              {editTitleOpen && (
                <TextField
                  autoFocus={true}
                  defaultValue={title}
                  onKeyPress={onEnter}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              )}
            </ListItem>
          </Grid>
          {/* </Grid> */}
        </div>
        {/* <Grid container direction="row"> */}
        <div className={classes.div}>
          <Grid item>
            {!editTitleOpen && (
              <div>
                <IconButton
                  onClick={() => {
                    setEditTitleOpen(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={onDeleteHandler}>
                  <DeleteForever color="secondary" />
                </IconButton>
              </div>
            )}

            {editTitleOpen && (
              <IconButton onClick={submitUpdateHandler}>
                <Done />
              </IconButton>
            )}
          </Grid>
          {/* </Grid> */}
        </div>
        {/* </Grid> */}
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
