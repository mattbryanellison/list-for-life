import React, { useEffect, useState } from "react";

import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles, CircularProgress } from "@material-ui/core";

import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import AllTasks from "./AllTasks";
import Navbar from "./Navbar";
import { getMeThunk } from "../redux/user";

const useStyles = makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
});

const NavRoute = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) => (
      <div>
        <Navbar />
        <Component {...props} />
      </div>
    )}
  />
);

const Routes = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inTimeout, setInTimeout] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const classes = useStyles();

  useEffect(async () => {
    setTimeout(() => {
      setInTimeout(false);
    }, 1000);
    await props.getMe();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!inTimeout && !isLoading) setShowLoading(false);
  }, [inTimeout, isLoading]);

  return (
    <div>
      {showLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <Switch>
          <NavRoute exact path="/signup" component={Signup} />
          <NavRoute exact path="/login" component={Login} />
          {props.isLoggedIn && (
            <Switch>
              <NavRoute exact path="/home" component={Home} />
              <NavRoute path="/lists/:listId" component={AllTasks} />
              <NavRoute component={Home} />
            </Switch>
          )}

          <NavRoute component={Login} />
        </Switch>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: async () => {
      await dispatch(getMeThunk());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
