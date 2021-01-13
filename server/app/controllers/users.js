const db = require("../../db");
const Errors = require("../models/Errors")
const User = require("../models/User");
module.exports = { 
   index: (request, response) => { // to be replaced, unless I find use for index then I migrate to model
      db.query(
         "SELECT id, username FROM users ORDER BY id ASC", 
         (error, results) => {
            response.status(200).json(results.rows);
         }
      );
   },
   getUserById: (request, response) => {
      const id = parseInt(request.params.id)
      User.find(id).then(user => {
         if( user ) {
            return response.status(200).json(user);
         } else {
            return response.status(404).json(Errors.messages)
         }
      })
   },
   createUser: (request, response) => {
      // User model handles verification and encryption
      User.newUser({
        username: request.body.username,
        password: request.body.password,
      }).then( user => {
         if( user ){
            return response.status(201).json(user)
         } else {
            return response.status(404).json(Errors.messages)
         }
      })
   }, 
   updateUser: (request, response) => { //to be replaced and reworked
      const id = parseInt(request.params.id);
      const { username, password } = request.body;
      db.query(
         'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING id, username',
         [username, password, id],
         (error, results) => {
            response.status(200).json(results.rows[0])
         }
      )
   },
   deleteUser: (request, response) => { // will integrate into frontend at some point
      const id = parseInt(request.params.id);
      User.delete(id).then( user => {
         response.status(200).json(user) //return user object to confirm deletion 
      })
   }
}