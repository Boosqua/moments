import React, {useState, useCallback}  from 'react';

import { 
   Link,
   withRouter,
   useRouteMatch,
   useHistory
} from "react-router-dom";
import {Container, makeStyles, Typography, Button, TextField} from '@material-ui/core'
import styleSheet from './session.css'
const useStyles = makeStyles((theme) => ({
   container: {
      background: '#0077b6',
      maxWidth: '120px',
      height: "inherit"
   },
   header: {
      fontSize: "10px",
      marginTop: "10px",
      marginBottom: "10px",
   },
   button: {
      width: "20px"
   }
}))
function LoginForm(props){
   let style = useStyles()
   let { path, url }  = useRouteMatch()
   const history = useHistory();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const handleInput = (cb) => {
      return (e) => {
         cb(e.currentTarget.value)
      }
   }

   // Render the session errors if there are any
   // const renderErrors = () => {
   //    return(
   //          <ul>
   //          {Object.keys(this.state.errors).map((error, i) => (
   //             <li key={`error-${i}`}>
   //                {this.state.errors[error]}
   //             </li>
   //          ))}
   //          </ul>
   //       );
   // }

   return (

      <Container className={style.container} >
      <Typography variant="h6" className={style.header}>
         {path === "/login" ? 
            "Welcome Back" : 
            "Register"
         }
      </Typography>
      <form onSubmit={() => {
         let user = {
            username: username,
            password: password
         }
      
         props.formType(user)
         setPassword('')
      }} style={{fontSize: "8px"}}>
            <input type="text"
               value={username}
               onChange={handleInput(setUsername)}
               placeholder="Username"
               className="sessionInput"
            />
         <br/>
            <input type="password"
               className="sessionInput"
               value={password}
               onChange={handleInput(setPassword)}
               placeholder="Password"
            />
         <br/>
         <Link
         className="session-links"
         to={path === "/login" ?
         "/signup" : 
         "/login"}>
            {path=== "/login" ? 
            "Need an account?" :
            "Already have an account?"}
         </Link>
         <Button type='submit'>submit</Button>
         {/* {renderErrors()} */}
      </form>
      </Container>
   );
  
}
export const SessionForm = withRouter(LoginForm)