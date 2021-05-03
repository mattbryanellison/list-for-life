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
      //#2b2b2b, #1f1f14, #262626, #2f2f1e
      default: "#2b2b2b",
    },
  },
  typography: {
    fontFamily: "Roboto",
    body1: {
      fontWeight: 100,
    },
    h4: {
      fontFamily: "Fredericka the Great",
    },
    h5: {
      fontWeight: 300,
    },
    h6: {
      fontWeight: 100,
    },
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
