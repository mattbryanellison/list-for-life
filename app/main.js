import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import history from "./history";

import store from "./store";
import Routes from "./components/Routes";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#ffffff",
    },
    default: {
      main: "#6600cc",
    },
    background: {
      default: "#2b2b2b",
    },
  },
  typography: {
    fontFamily: "Fredericka the Great",
    // fontWeightLight: 400,
  },
});
render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router history={history}>
        <Routes />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("main")
);
