import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  List,
  Paper,
  ListItem,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { Delete, DeleteForever, Edit, Close } from "@material-ui/icons";
import history from "../history";

import { fetchLists, deleteListThunk, putList } from "../redux/lists";

// import EditListDialog from "./EditListDialog";
const useStyles = makeStyles({
  rowBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2b2b2b",
  },
  container: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  redIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "red",
    },
  },
  paperBackground: {
    backgroundColor: "#2b2b2b",
  },
  rootPaper: {
    // marginTop: "0.5em",
  },
  title: {
    margin: "6px",
    marginLeft: "0.6em",
  },
});

const AllLists = (props) => {
  const classes = useStyles();
  let { lists } = props;
  // let { listId } = useParams();
  // console.log(listId);
  const [title, setTitle] = useState("");
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [listIdToDelete, setListIdToDelete] = useState(0);

  // useEffect(() => {
  //   console.log("DIALOG IS OPEN IS: ", dialogIsOpen);
  // }, [dialogIsOpen]);

  const blurActive = () => {
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  const handleConfirmDelete = () => {
    setDialogIsOpen(false);
    props.deleteList(listIdToDelete);
    setListIdToDelete(0);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      props.deleteList(listIdToDelete);
      setDialogIsOpen(false);
      setListIdToDelete(0);
    }
    if (e.keyCode === 27) {
      setDialogIsOpen(false);
      setListIdToDelete(0);
      blurActive();
    }
  };

  useEffect(() => {
    // console.log("USE EFFECT FIRING");
    try {
      props.loadAllLists();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        My Lists
      </Typography>
      <Divider></Divider>
      <Paper className={classes.rootPaper}>
        <List className={classes.container}>
          {lists
            .sort((a, b) => {
              return b.lastUpdate - a.lastUpdate;
            })
            .map((list) => {
              return (
                <div key={list.id}>
                  <div className={classes.rowBox}>
                    <ListItem
                      className={classes.paperBackground}
                      button
                      title={list.title}
                      onClick={() => {
                        history.push(`/lists/${list.id}`);
                      }}
                    >
                      <Typography variant="h6">{list.title}</Typography>
                    </ListItem>
                    <IconButton
                      className={classes.redIcons}
                      onClick={() => {
                        setDialogIsOpen(true);
                        setListIdToDelete(list.id);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                    <Dialog
                      open={dialogIsOpen}
                      onKeyUp={(e) => handleKeyUp(e)}
                      // onKeyPress={() => {
                      //   console.log("I HIT ENTER");
                      // }}
                      // onKeyDown={(e) => {
                      //   console.log("I HIT ENTER", e.key);
                      // }}
                    >
                      <DialogTitle id="delete-confirmation">
                        <Typography align="center">Are you sure?</Typography>
                      </DialogTitle>
                      <DialogActions>
                        <Button
                          variant="contained"
                          fullWidth={false}
                          value={list.id}
                          onClick={handleConfirmDelete}
                          // onClick={() => {
                          //   props.deleteList(listIdToDelete);
                          //   setDialogIsOpen(false);
                          //   setListIdToDelete(0);
                          // }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth={false}
                          onClick={() => {
                            setDialogIsOpen(false);
                            setListIdToDelete(0);
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div>
                    <Divider />
                  </div>
                </div>
              );
            })}
        </List>
      </Paper>
    </div>
  );
};

const mapState = (state) => {
  return {
    lists: state.lists,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllLists: () => dispatch(fetchLists()),
    deleteList: (id) => dispatch(deleteListThunk(id)),
    updateList: (id, list) => dispatch(putList(id, list)),
  };
};

export default connect(mapState, mapDispatch)(AllLists);
