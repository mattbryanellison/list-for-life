import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import history from "./history";

import store from "./store";
import Routes from "./components/Routes";

//TODO: put dark theme on

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
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
