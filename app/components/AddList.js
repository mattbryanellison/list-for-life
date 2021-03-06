import React, { useState } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  TextField,
  makeStyles,
  ClickAwayListener,
} from "@material-ui/core";
import { Add, Done, Cancel } from "@material-ui/icons";

import { postList } from "../redux/lists";
import history from "../history";

const useStyles = makeStyles({
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
  rowBox: {
    display: "flex",
  },
  rowBoxSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
});

const AddList = (props) => {
  const classes = useStyles();
  const [textfieldIsOpen, setTextfieldIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmitList = () => {
    if (title === "") {
      setErrorText("Name your new list!");
      return;
    }
    const list = {
      title,
    };
    props.addNewList(list);
    console.log("I AM LIST: ", list);
    // redirect to newly created list
    // history.push(`/lists/${list.id}`);
    setTextfieldIsOpen(false);
    setTitle("");
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmitList();
      setTitle("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setTextfieldIsOpen(false);
      setErrorText("");
      setTitle("");
    }
  };

  const handleClickAway = () => {
    setTextfieldIsOpen(false);
    setTitle("");
  };

  return (
    <div className={classes.rowBoxSpaceBetween}>
      {!textfieldIsOpen && (
        <IconButton
          onClick={() => {
            setTextfieldIsOpen(true);
          }}
          className={classes.greenIcons}
        >
          <Add fontSize="large" />
        </IconButton>
      )}

      {textfieldIsOpen && (
        <div className={classes.rowBoxSpaceBetween}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              onKeyDown={handleKeyDown}
              id="title"
              label="List Name"
              type="title"
              fullWidth
              onKeyPress={onEnter}
              error={errorText.length ? true : false}
              helperText={errorText}
              onChange={(event) => {
                setErrorText("");
                setTitle(event.target.value);
              }}
            />
          </ClickAwayListener>
          <div className={classes.rowBox}>
            <IconButton
              onClick={handleSubmitList}
              onKeyPress={onEnter}
              disabled={!title}
            >
              <Done />
            </IconButton>
            <IconButton
              onClick={() => {
                setTextfieldIsOpen(false);
                setErrorText("");
              }}
            >
              <Cancel />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
  {
    /* <Dialog
        onBackdropClick={handleCancel}
        onEscapeKeyDown={handleCancel}
        open={open}
      > */
  }
  {
    /* <DialogTitle>Add A New List</DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitList} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog> */
  }
};

const mapDispatch = (dispatch) => {
  return {
    addNewList: (list) => dispatch(postList(list)),
  };
};

export default connect(null, mapDispatch)(AddList);
