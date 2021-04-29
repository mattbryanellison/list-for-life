import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import history from "../history";
import { postUser, fetchUser, endSessionUser } from "../redux/user";

import Signup from "./Signup";

//TODO: Logout functionality?

const useStyles = makeStyles(() => ({
  root: {
    width: "25%",
    maxWidth: "25%",
  },
  button: {
    margin: 5,
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser({ email, password });
  };

  // const signupViewOpenHandler = (event) => {

  // };
  return (
    <Card className={classes.root}>
      <form noValidate autoComplete="off">
        <Card>
          <TextField
            id="outlined-basic"
            label="Email"
            fullWidth
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            fullWidth
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Card>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </form>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("/signup");
        }}
      >
        Signup
      </Button>
      {/* <Signup /> */}
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      // console.log("I LOGGED IN");
      dispatch(fetchUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
