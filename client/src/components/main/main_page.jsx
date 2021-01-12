import React from "react";
import NavBarContainer from "../nav/navbar_container"
import LandingPage from "../landing_page/landing_page_container"
import {  createMuiTheme, ThemeProvider} from "@material-ui/core";



function MainPage(props) {


   return (
      <div >
         <NavBarContainer />
         <LandingPage />
      </div >
    )
}

export default MainPage;
