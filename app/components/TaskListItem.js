import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  ListItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

import InfoDialog from "./InfoDialog";
import EditDialog from "./EditDialog";
import { putTask, deleteTaskThunk } from "../redux/tasks";

const TaskListItem = (props) => {
  const { task } = props;
  const { listId } = useParams();
  const [editDialogIsOpen, openEditDialog] = useState(false);
  const [infoDialogIsOpen, openInfoDialog] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const checkboxHandler = (event) => {
    props.updateTask(listId, task.id, {
      completed: event.target.checked,
    });
  };

  const submitUpdateHandler = () => {
    props.updateTask(listId, task.id, {
      title,
      description,
    });
    openEditDialog(false);
  };

  const onDeleteHandler = () => {
    props.deleteTask(listId, task.id);
    openEditDialog(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      submitUpdateHandler();
    }
  };

  return (
    <div>
      <ListItem>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={task.completed} onChange={checkboxHandler} />
            }
          />
        </FormGroup>
        <Typography>{task.title}</Typography>
        <IconButton onClick={() => openInfoDialog(true)}>
          <Info />
        </IconButton>
        <InfoDialog
          openInfoDialog={openInfoDialog}
          task={task}
          openEditDialog={openEditDialog}
          infoDialogIsOpen={infoDialogIsOpen}
        />
        <EditDialog
          openEditDialog={openEditDialog}
          editDialogIsOpen={editDialogIsOpen}
          task={task}
          onEnter={onEnter}
          setTitle={setTitle}
          setDescription={setDescription}
          submitUpdateHandler={submitUpdateHandler}
          onDeleteHandler={onDeleteHandler}
        />
      </ListItem>
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
