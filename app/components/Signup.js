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
  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextPassword, setErrorTextPassword] = useState("");

  const classes = useStyles();

  const signupHandler = (event) => {
    event.preventDefault();
    if (name === "") {
      setErrorTextName("Please fill in your name!");
      return;
    }
    if (email === "") {
      setErrorTextEmail("Please fill in your email address!");
      return;
    }
    if (password === "") {
      setErrorTextPassword("Please fill in your password!");
      return;
    }
    props.signup({ email, password, name });
  };

  const handleKeyDown = (e) => {
    //in order to have autofocus on each textfield, so that if you hit escape it autofocuses, do I need to have a handlekeydown for each textfield line?
    if (e.key === "Enter") {
      if (name === "") {
        setErrorTextName("Please fill in your name!");
        return;
      }
      if (email === "") {
        setErrorTextEmail("Please fill in your email address!");
        return;
      }
      if (password === "") {
        setErrorTextPassword("Please fill in your password!");
        return;
      }
      props.signup({ email, password, name });
    } else if (e.keyCode === 27) {
      //cancel
      setErrorTextName("");
      setErrorTextEmail("");
      setErrorTextPassword("");
      return;
    }
  };

  return (
    <Card className={classes.root}>
      <Card>
        <TextField
          id="name"
          label="Name"
          fullWidth
          autoComplete="off"
          autoFocus
          onKeyDown={handleKeyDown}
          error={errorTextName.length ? true : false}
          helperText={errorTextName}
          onChange={(event) => {
            setErrorTextName("");
            setName(event.target.value);
          }}
        />
        <TextField
          id="email"
          label="Email"
          fullWidth
          disabled={!name.length}
          onKeyDown={handleKeyDown}
          error={errorTextEmail.length ? true : false}
          helperText={errorTextEmail}
          onChange={(event) => {
            setErrorTextEmail("");
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
          onKeyDown={handleKeyDown}
          disabled={!name.length || !email.length}
          error={errorTextPassword.length ? true : false}
          helperText={errorTextPassword}
          onChange={(event) => {
            setErrorTextPassword("");
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
        Sign Up
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
