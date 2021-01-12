import React from "react";
import NavBarContainer from "../nav/navbar_container"
import LandingPage from "../landing_page/landing_page_container"
import { Grid, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {  useRouteMatch,} from 'react-router-dom'
function MainPage(props) {
   const theme = createMuiTheme({
      typography: {
         fontFamily: "'Playfair Display', serif",
         button: {
            fontSize: '8px',
            height: "14px",
            padding: "0px",
            margin: "0px",
         }
      }
   })
   const {path} = useRouteMatch()
   function page() {
      switch (path) {
         case '/something':
      
         default:
            return( <LandingPage />);
      }
   }
   return (
      <ThemeProvider theme={theme}>
         <NavBarContainer />
         {page()}
      </ThemeProvider >
    )
}

export default MainPage;
