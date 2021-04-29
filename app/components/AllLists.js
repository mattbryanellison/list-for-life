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
} from "@material-ui/core";
import { Delete, Edit, Close } from "@material-ui/icons";
import history from "../history";

import { fetchLists, deleteListThunk, putList } from "../redux/lists";

// import EditListDialog from "./EditListDialog";

const AllLists = (props) => {
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
                <ListItem
                  button
                  key={list.id}
                  title={list.title}
                  onClick={() => {
                    history.push(`/lists/${list.id}`);
                  }}
                >
                  <Typography variant="h4">{list.title}</Typography>
                  {/* <IconButton onClick={() => {}}>
                  <Edit />
                </IconButton> */}
                  <IconButton
                    onClick={() => {
                      props.deleteList(list.id);
                      history.go(-1);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
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
