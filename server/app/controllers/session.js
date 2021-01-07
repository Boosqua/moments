const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const loginUser = (request, response) => {
   const { username, password } = request.body
   db.query( "SELECT * FROM users WHERE username = $1", [username])
      .then((results) => {
         console.log(results)
         if ( results.rows.length === 0){
            return response.status(404).json({ username: 'username does not exist'})
         }
         const user = results.rows[0]
         bcrypt.compare( password, user.password )
            .then(isMatch => {
               if(isMatch) {
                  const payload = { id: user.id, username: user.username };

                  jwt.sign(
                     payload,
                     keys.secretOrKey,
                     {expiresIn: 3600},
                     (error, token) => {
                        response.json({
                           success: true,
                           token: 'Bearer '+ token
                        })
                     }
                  )
               } else {
                  return response.status(400).json({ password: 'incorrect password'})
               }
            }
         )
      }
   ).catch( error => { console.log( error )})
}

module.exports = {
   loginUser
}