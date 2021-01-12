import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, ThemeProvider} from "@material-ui/core"
import MainPage from "./main/main_page";
import Albums from './album_crud/album_container'

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Playfair Display', serif",
    button: {
      fontSize: "8px",
      height: "14px",
      padding: "0px",
      margin: "0px",
    },
  },
});
const App = () => (
  <div>
    <CssBaseline>
      <ThemeProvider theme={theme}>
         <Switch>
            <Route exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={MainPage} />
            <AuthRoute exact path="/signup" component={MainPage} />
            <ProtectedRoute exact path="/@me" component={MainPage} />
            <ProtectedRoute exact path='/@me/albums' component={Albums} />
         </Switch>
      </ThemeProvider>
    </CssBaseline>
  </div>
);

export default App;
