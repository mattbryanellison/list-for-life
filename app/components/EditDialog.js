import React from "react";
import {
  ListItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import { Info, Close } from "@material-ui/icons";

const EditDialog = (props) => {
  const {
    openEditDialog,
    editDialogIsOpen,
    task,
    onEnter,
    setTitle,
    setDescription,
    submitUpdateHandler,
    onDeleteHandler,
  } = props;
  return (
    <Dialog
      onBackdropClick={() => openEditDialog(false)}
      onEscapeKeyDown={() => openEditDialog(false)}
      open={editDialogIsOpen}
    >
      <DialogContent>
        <TextField
          autoFocus
          defaultValue={task.title}
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
          defaultValue={task.description}
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
        <Button onClick={submitUpdateHandler} color="primary">
          Save
        </Button>
        <Button onClick={onDeleteHandler} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
