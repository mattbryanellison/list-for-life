import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import history from "./history";

import store from "./store";
import Routes from "./components/Routes";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
  },
});
render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <Router history={history}>
        <Routes />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("main")
);
