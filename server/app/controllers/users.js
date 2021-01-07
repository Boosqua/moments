const db = require("../../db");
const bcrypt = require("bcryptjs");
module.exports = { 
   index: (request, response) => {
      db.query(
         "SELECT id, username FROM users ORDER BY id ASC", 
         (error, results) => {
            if (error) {
               throw error;
            }
            response.status(200).json(results.rows);
         }
      );
   },
   getUserById: (request, response) => {
      const id = parseInt(request.params.id)

      db.query(
         'SELECT id, username FROM users WHERE id = $1', 
         [id], 
         (error, results) => {
            if (error) {
               throw error;
            }
            response.status(200).json(results.rows[0])
         }
      );
   },
   createUser: async (request, response) => {
      const { username, password } = request.body

      const existingUser = await db.query( //check db for preexisting username
         'SELECT * FROM users WHERE username = $1',
         [username]
      );
      let errors = {};
      let invalidEntry = false
      if (existingUser.rows.length > 0) { //throw error if username has been taken
         errors['username'] = "Username has already been taken";
         invalidEntry = true
      }
      if (password.length < 6) {//throw error if password is too short
            errors['password'] = "Password must contain at least six characters."
            invalidEntry = true;
      } 
      if (username.length <= 3){//throw error if username is too short
         errors['username'] = "Username must contain at least four characters"
         invalidEntry = true;
      }
      if( invalidEntry ) return response.status(400).json(errors)
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt)
      db.query(
         'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
         [username, hash],
         (error, results) => {
            if( error ) {
               throw error;
            }
            console.log(results)
            response.status(201).json(results.rows[0])
         }
      )
   }, 
   updateUser: (request, response) => {
      const id = parseInt(request.params.id);
      const { username, password } = request.body;

      db.query(
         'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING id, username',
         [username, password, id],
         (error, results) => {
            if( error ) {
               throw error
            }
            response.status(200).json(results.rows[0])
         }
      )
   },
   deleteUser: (request, response) => {
      const id = parseInt(request.params.id);
      
      db.query(
         'DELETE FROM users WHERE id = $1 RETURNING id, username',
         [id],
         (error, results) => {
            if( error ) {
               throw error
            }
            response.status(200).send(results.rows[0])
         }
      )
   }
}