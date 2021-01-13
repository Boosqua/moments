import React, {useState, useEffect, useCallback} from 'react';
import navStyle from "./nav.css";
import {  
   Grid, 
   ButtonGroup, 
   Button, 
   createMuiTheme, 
   ThemeProvider, 
   makeStyles, 
   Drawer
} from '@material-ui/core';
import LoginForm from '../session/login_form_container';
import SignUpForm from '../session/signup_form_container';
import Profile from '../profile/profile_container';
import {
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

const theme = createMuiTheme({
   typography: {
      fontFamily: "'Playfair Display', serif",
      button: {
         fontSize: '25px',
         height: "30px",
         padding: "10px",
         margin: "0px",
      }
   }
})
const useStyles = makeStyles((theme)=>({
   button: {
      padding: 10,
      margin: 0,
      display:'flex',
      
   },
   grid: {
      height: 50
   },
   modal: {
      display: "flex",
      flexDirection: "row-reverse",

   }
}))

//this is a monster that needs to be reworked
//I used this component to learn material ui and some hooks
function NavBar(props){
   let style = useStyles()
   let { path }  = useRouteMatch()
   const history = useHistory();
   const handleOnClick = useCallback(() => history.push('/'))
   useEffect( () => {
      // need to rework waaaay to many db queries
      let userId = props.user ? props.user.id : 0
      props.fetchAllAlbums({userId: userId})
   })
   let sessionModal = (path === '/login' || path === "/signup") 
   let profileModal = (path === '/@me') //huge issue if someone hits profile they get redirected
   let form
   function options () {
      return !props.loggedIn ? 
       (<Grid container item xs={3} spacing={0} alignItems="center" justify="center">
               <ButtonGroup variant="contained" size="medium" disableElevation >
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
               <Drawer
                  anchor="right"
                  open={openModal}
                  SlideProps={ {in: openModal, direction: "right"} }
                  onClose={handleOnClick}
                  className={style.modal}
                  >
                     {form}
               </Drawer>
            </Grid>) : 
            (
               <Grid container item xs={4} spacing={1} alignItems="center" justify="center">
                  <ButtonGroup variant="contained" size="medium" disableElevation >
                  <Link to={`/@me/albums`} style={{textDecoration: "none"}}>
                     <Button type="button" className={style.button}>
                        My Albums
                     </Button>
                  </Link>
                  <Link to={`/signup`} style={{textDecoration: "none"}}>
                     <Button type="button" className={style.button}>
                        Home
                     </Button>
                  </Link>
                  <Link to={`/@me`} style={{textDecoration: "none"}}>
                     <Button type="button" className={style.button}>
                        profile
                     </Button>
                  </Link>
               </ButtonGroup>
               <Drawer
                  anchor="right"
                  open={openProfile}
                  SlideProps={ {in: openProfile, direction: "right"} }
                  onClose={handleOnClick}
                  className={style.modal}
                  >
                     <Profile />
               </Drawer>
               </Grid>
            )
   }
   if( path === '/login'){
      form = <LoginForm />
   } else {
   form = <SignUpForm />
   }
   const [openModal,setModal] = useState(sessionModal)
   const [openProfile, setProfile] = useState(profileModal)
   useEffect(() => {
      setModal(path === '/login' || path === "/signup")
      setProfile(path === '/@me')
   })
   return (
      <ThemeProvider theme={theme} key="">
         <div className="nav-bar">
         <Grid container direction='row' justify="space-between" alignContent="center" alignItems="center" space={1} className={style.grid}>
            <Grid container item sm={3}  alignItems="center" justify="center">
                  <p style={{fontFamily: "'Playfair Display', serif", fontSize: "30px"}}>Photo Dojo</p>
            </Grid>
            
         {options()}
         </Grid>
         </div>
      </ThemeProvider>

   );
}


export default NavBar;


