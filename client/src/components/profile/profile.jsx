import React from 'react'
import {useStyles} from '../session/login_form'
import  { Container, Typography, Button} from '@material-ui/core'
export default  function Profile(props) {
   const style = useStyles()
   return(
   <Container className={style.container} >
         <Typography variant="h6" className={style.header} style={{fontSize: "40px"}}>
            { `Welcome Back ${props.user.username}!`}
         </Typography>
         <Button className={style.button} onClick={ props.logout }>Logout?</Button>
   </Container>
   )
}