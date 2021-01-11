import React, {useState, useEffect, useCallback} from 'react';
import navStyle from "./nav.css"
import { Modal, Grid, ButtonGroup, Button, createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core';
import LoginForm from '../session/login_form_container'
import SignUpForm from '../session/signup_form_container'
import {
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";
const theme = createMuiTheme({
   typography: {
      fontFamily: "'Playfair Display', serif",
      button: {
         fontSize: '8px',
         padding: "0px",
         margin: "0px",
      }
   }
})
const useStyles = makeStyles((theme)=>({
   button: {
      padding: 0,
      margin: 0,
      display:'flex',
      
   },
   grid: {
      height: 30
   }
}))
function NavBar(props){
   let style = useStyles()
   let { path, url }  = useRouteMatch()
   const history = useHistory();
   const handleOnClick = useCallback(() => history.push('/'))
   let modal = path !== '/'
   let form;
   if( path === '/login'){
      form = <LoginForm />
   } else {
      form = <SignUpForm />
   }
   const [openModal,setModal] = useState(modal)
   useEffect(() => {
      setModal(path !== '/')
   })
   return (
      <ThemeProvider theme={theme}>
         <div className="nav-bar">
         <Grid container direction='row' justify="space-between" alignContent="center" alignItems="center" space={3} className={style.grid}>
            <Grid container item xs={2}  alignItems="center" justify="center">
                  <p style={{fontFamily: "'Playfair Display', serif"}}>Photo Dojo</p>
            </Grid>
            <Grid container item xs={3} spacing={0} alignItems="center" justify="center">
               <ButtonGroup variant="contained" size="small" disableElevation >
                  <Link to={`/login`} style={{textDecoration: "none"}}>
                     <Button type="button" className={style.button}>
                        Log In
                     </Button>
                  </Link>
                  <Link to={`/signup`} style={{textDecoration: "none"}}>
                     <Button type="button" className={style.button}>
                        Sign Up
                     </Button>
                  </Link>
               </ButtonGroup>
               <Modal
                  open={openModal}
                  onClose={handleOnClick}
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  >
                     {form}
               </Modal>
            </Grid>
         </Grid>
         </div>
      </ThemeProvider>

   );
}

export default NavBar;


