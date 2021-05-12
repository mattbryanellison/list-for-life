import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import GoogleButton from "react-google-button";

import history from "../history";
import {
  postUser,
  fetchUser,
  endSessionUser,
  clearLoginError,
} from "../redux/user";

import Signup from "./Signup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "290px",
    maxWidth: "290px",
    margin: 10,
    padding: "20px",
  },
  button: {
    // backgroundColor: "#4d0099",
    margin: 10,
  },
  emailTextfield: {
    marginBottom: "5px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Login = (props) => {
  const { error } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextPassword, setErrorTextPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(error);

  const classes = useStyles();

  useEffect(() => {
    setAlertOpen(error);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.clearError();
    setAlertOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (email === "") {
        setErrorTextEmail("Please fill in your email address!");
        return;
      }
      if (password === "") {
        setErrorTextPassword("Please fill in your password!");
        return;
      }
      props.loginUser({ email, password });
    } catch (err) {
      console.log("I AM THE ERROR", err);
      setAlertOpen(true);
    }
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (email === "") {
        setErrorTextEmail("Please fill in your email address!");
        return;
      }
      if (password === "") {
        setErrorTextPassword("Please fill in your password!");
        return;
      }
      props.loginUser({ email, password });
    } else if (e.keyCode === 27) {
      setErrorTextEmail("");
      setErrorTextPassword("");
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form noValidate autoComplete="off">
          <TextField
            className={classes.emailTextfield}
            id="outlined-basic"
            label="Email"
            fullWidth
            autoFocus
            onKeyDown={handleOnKeyDown}
            error={errorTextEmail.length ? true : false}
            helperText={errorTextEmail}
            onChange={(event) => {
              setErrorTextEmail("");
              setEmail(event.target.value);
            }}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            fullWidth
            autoComplete="current-password"
            disabled={!email.length}
            onKeyDown={handleOnKeyDown}
            error={errorTextPassword.length ? true : false}
            helperText={errorTextPassword}
            onChange={(event) => {
              setErrorTextPassword("");
              setPassword(event.target.value);
            }}
          />
          <Button
            className={classes.button}
            variant="contained"
            disabled={!email.length || !password.length}
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
          Sign Up
        </Button>
        <GoogleButton
          onClick={() => {
            window.location.href = "http://localhost:8080/auth/google";
          }}
        />
      </Card>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          Login failed!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const mapState = (state) => {
  return {
    error: !!state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      // console.log("I LOGGED IN");
      dispatch(fetchUser(user));
    },
    clearError: () => {
      dispatch(clearLoginError());
    },
  };
};

export default connect(mapState, mapDispatchToProps)(Login);
