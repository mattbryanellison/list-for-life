import React, { useState } from "react";
import { connect } from "react-redux";

import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { postUser } from "../redux/user";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    margin: 5,
  },
}));

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const signupHandler = (event) => {
    event.preventDefault();
    // console.log("I would submit", { name, email, password });
    props.signup({ email, password, name });
  };

  return (
    <Card className={classes.root}>
      {/* <form noValidate autoComplete="off"> */}
      <Card>
        <TextField
          id="name"
          label="Name"
          fullWidth
          autoComplete="off"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoComplete="new-password"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="new-password"
          fullWidth
          // autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </Card>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={signupHandler}
      >
        Signup
      </Button>
      {/* </form> */}
    </Card>
  );
};

// const mapState = (state) => {
//   return {};
// };

const mapDispatch = (dispatch) => {
  return {
    signup: (user) => {
      dispatch(postUser(user));
    },
  };
};

export default connect(null, mapDispatch)(Signup);
