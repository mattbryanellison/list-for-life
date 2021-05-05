import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import AllTasks from "./AllTasks";
import Navbar from "./Navbar";

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
  return (
    <Switch>
      <NavRoute exact path="/signup" component={Signup} />
      <NavRoute exact path="/login" component={Login} />
      {props.isLoggedIn && (
        <Switch>
          <NavRoute exact path="/home" component={Home} />
          <NavRoute path="/lists/:listId" component={AllTasks} />
        </Switch>
      )}

      <NavRoute component={Login} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

export default withRouter(connect(mapStateToProps, null)(Routes));
