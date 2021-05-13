import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Cancel, ArrowBackIos, Done } from "@material-ui/icons";
import { connect } from "react-redux";
import { editUser } from "../redux/user";
import Navbar from "./Navbar";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    margin: 5,
  },
  container: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  typ: {
    color: "#ffffff",
  },
  editIcons: {
    color: "#ffffff",
  },
  greenIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "#66ff33",
    },
  },
  redIcons: {
    color: "#ffffff",
    "&:hover": {
      color: "#ff0000",
    },
  },
  rowBoxItemWide: {
    display: "flex",
    width: "100%",
  },
  rowBoxItem: {
    display: "flex",
    flexDirection: "row",
  },
  rowBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  rowBoxSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingLeft: "1.2em",
  },
}));

const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const UserAccount = (props) => {
  const { user } = props;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [editNameIsOpen, setEditNameIsOpen] = useState(false);
  const [editEmailIsOpen, setEditEmailIsOpen] = useState(false);
  const [password, setPassword] = useState(user.password);
  const [errorTextName, setErrorTextName] = useState("");
  const [errorTextEmail, setErrorTextEmail] = useState("");
  const [errorTextPassword, setErrorTextPassword] = useState("");

  const classes = useStyles();

  const validEmail = validateEmail(email);

  const handleEditName = (e) => {
    e.preventDefault();
    if (name === "") {
      setErrorTextName("Please update your name or cancel!");
      return;
    }

    // if (!validEmail) {
    //   setErrorTextEmail("Please update your email address or cancel!");
    //   return;
    // }

    // if (password === "") {
    //   setErrorTextPassword("Please update your password or cancel!");
    //   return;
    // }
    props.updateUser(user.id, { name });
    // console.log("I would have updated with: ", name);
  };

  const handleEditEmail = (e) => {
    e.preventDefault();
    if (!validEmail) {
      setErrorTextEmail("Please update your email address or cancel!");
      return;
    }
    props.updateUser(user.id, { email });
    setEditEmailIsOpen(false);
  };
  const handleKeyDownEmail = (e) => {
    if (e.key === "Enter") {
      if (!validEmail) {
        setErrorTextEmail("Please enter a valid email address!");
        return;
      }
      props.updateUser(user.id, { email });
      setEditEmailIsOpen(false);
    } else if (e.keyCode === 27) {
      setEmail(user.email);
      setErrorTextEmail("");
      setEditEmailIsOpen(false);
      return;
    }
  };

  const handleKeyDownName = (e) => {
    if (e.key === "Enter") {
      if (name === "") {
        setErrorTextName("Please fill in your name!");
        return;
      }
      // if (email === "") {
      //   setErrorTextEmail("Please fill in your email address!");
      //   return;
      // }

      // if (!validEmail) {
      //   setErrorTextEmail("Please enter a valid email address!");
      //   return;
      // }

      // if (password === "") {
      //   setErrorTextPassword("Please fill in your password!");
      //   return;
      // }

      props.updateUser(user.id, { name });
      setEditNameIsOpen(false);
    } else if (e.keyCode === 27) {
      setName(user.name);
      setErrorTextName("");
      setEditNameIsOpen(false);
      // setErrorTextEmail("");
      // setErrorTextPassword("");
      return;
    }
  };

  return (
    <div>
      <Card>
        {/* edit name */}
        {!editNameIsOpen && (
          <div className={classes.rowBoxSpaceBetween}>
            <Typography variant="subtitle1">Name: </Typography>
            <Typography variant="h4">{name}</Typography>
            <IconButton
              onClick={() => {
                setEditNameIsOpen(true);
                setErrorTextName("");
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div>
        )}
        {editNameIsOpen && (
          <div>
            <TextField
              variant="outlined"
              defaultValue={name}
              autoFocus
              onKeyDown={handleKeyDownName}
              error={errorTextName.length ? true : false}
              helperText={errorTextName}
              onChange={(event) => {
                setErrorTextName("");
                setName(event.target.value);
              }}
            />

            <IconButton onClick={handleEditName} disabled={!name}>
              <Done />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditNameIsOpen(false);
              }}
            >
              <Cancel />
            </IconButton>
          </div>
        )}
        {/* edit email */}
        {!editEmailIsOpen && (
          <div className={classes.rowBoxSpaceBetween}>
            <Typography variant="subtitle1">Email: </Typography>
            <Typography variant="h4">{email}</Typography>
            <IconButton
              onClick={() => {
                setEditEmailIsOpen(true);
                setErrorTextEmail("");
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </div>
        )}
        {editEmailIsOpen && (
          <div>
            <TextField
              variant="outlined"
              defaultValue={email}
              autoFocus
              onKeyDown={handleKeyDownEmail}
              error={errorTextEmail.length ? true : false}
              helperText={errorTextEmail}
              onChange={(event) => {
                setErrorTextEmail("");
                setEmail(event.target.value);
              }}
            />

            <IconButton onClick={handleEditEmail} disabled={!email}>
              <Done />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditEmailIsOpen(false);
              }}
            >
              <Cancel />
            </IconButton>
          </div>
        )}
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (id, user) => {
      dispatch(editUser(id, user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
