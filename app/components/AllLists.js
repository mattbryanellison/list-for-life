import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  List,
  Paper,
  ListItem,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Delete, Edit, Close } from "@material-ui/icons";
import history from "../history";

import { fetchLists, deleteListThunk, putList } from "../redux/lists";

// import EditListDialog from "./EditListDialog";
const useStyles = makeStyles({
  rowBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // container: {
  //   paddingBottom: 0,
  //   paddingTop: 0,
  // },
});

const AllLists = (props) => {
  const classes = useStyles();
  let { lists } = props;
  // let { listId } = useParams();
  // console.log(listId);
  const [title, setTitle] = useState("");

  useEffect(() => {
    // console.log("USE EFFECT FIRING");
    try {
      props.loadAllLists();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // const deleteListHandler = () => {
  //   props.deleteList(list.id);
  //   history.push("/home");
  // };

  return (
    <div>
      <Paper>
        <List>
          {lists
            .sort((a, b) => {
              return b.lastUpdate - a.lastUpdate;
            })
            .map((list) => {
              return (
                <div className={classes.rowBox} key={list.id}>
                  <ListItem
                    // className={classes.container}
                    button
                    title={list.title}
                    onClick={() => {
                      history.push(`/lists/${list.id}`);
                    }}
                  >
                    <Typography variant="h4">{list.title}</Typography>
                    {/* <IconButton onClick={() => {}}>
                <Edit />
              </IconButton> */}
                  </ListItem>
                  <IconButton
                    onClick={() => {
                      props.deleteList(list.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
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
