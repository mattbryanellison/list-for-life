import React, { useState } from "react";
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

import { postList } from "../redux/lists";

const AddList = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleSubmitList = () => {
    const list = {
      title,
    };
    props.addNewList(list);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmitList();
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
        <DialogTitle>Add A New List</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitList} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addNewList: (list) => dispatch(postList(list)),
  };
};

export default connect(null, mapDispatch)(AddList);
