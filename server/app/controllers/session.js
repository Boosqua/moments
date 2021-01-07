const db = require("../../db");
const bcrypt = require("bcryptjs");

const loginUser = (request, response) => {
   const { username, password } = request.body
   console.log(username)
   db.query( 
      "SELECT * FROM users WHERE username = $1",
      [username],
      (error, results) => {
         if (error) {
            throw error
         } else if ( results.rows.length === 0){
            response.status(404).json({ username: 'username does not exist'})
         }
         const user = results.rows[0]
         bcrypt.compare( password, user.password )
            .then(isMatch => {
               if(isMatch) {
                  response.json({msg: 'Success'})
               } else {
                  return response.status(400).json({ password: 'incorrect password'})
               }
            }
         )
      }
   ) 
}

module.exports = {
   loginUser
}