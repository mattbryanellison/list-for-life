import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Menu, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Home from "@material-ui/icons/Home";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { endSessionUser } from "../redux/user";

import history from "../history";

const useStyles = makeStyles((theme) => ({
  icons: {
    color: "#ffffff",
  },
  tlbr: {
    backgroundColor: "#6600cc",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
  },
  spacer: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();

  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem
        className={classes.icons}
        onClick={() => {
          handleMenuClose();
          props.logout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.tlbr}>
          {/* <Button
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/home");
            }}
          >
            Listfor.life
          </Button> */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/home");
            }}
          >
            <Home />
          </IconButton>
          <div className={classes.spacer}></div>
          {/* <Button color="inherit" onClick={logoutButtonHandler}>
            Logout
          </Button> */}
          <IconButton
            className={classes.icons}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

// const mapState = (state) => {
//   return {};
// };

const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      dispatch(endSessionUser());
    },
  };
};

export default connect(null, mapDispatch)(Navbar);
