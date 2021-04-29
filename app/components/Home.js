import React from "react";
import { connect } from "react-redux";
import { fetchTasks } from "../redux/tasks";
import { fetchLists } from "../redux/lists";
import Navbar from "./Navbar";
import AllTasks from "./AllTasks";
import AllLists from "./AllLists";
import AddList from "./AddList";

const Home = (props) => {
  return (
    <div>
      <AllLists />
      <AddList />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllLists: () => dispatch(fetchLists()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
