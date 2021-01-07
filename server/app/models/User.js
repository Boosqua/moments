const db = require('../../db')
const bcrypt = require("bcryptjs");
const errors = { //error object holds messages for any User actions
   fullErrorMessages: []
}
const find = (id) => {
   errors.fullErrorMessages = []; // clear any previous errors
   return db.query(
      'SELECT id, username FROM users WHERE id = $1', 
      [id]).then( results => {
         //store error if no user found in DB
         if( results.rows[0] === undefined ){ 
            errors.fullErrorMessages.push( `No User with ID ${id}` )
            return false
         }
         return results.rows[0];
      })
}
const newUser = async (user) => {
   const { username, password } = user
   let validated = await validateUser(username, password)
   if( validated ){
      //encrypt password before insertion into db
      const hash = encryptPassword(password)
      return db.query(
         "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
         [username, hash]).then( results => {
            return results.rows[0]
         })
   } else {
      return null
   }
}
const encryptPassword = (password) => {
   let salt = bcrypt.genSaltSync(10);
   return bcrypt.hashSync(password, salt);
}
const validateUser = (username, password) => {
   // validate username and password using helper methods
   errors.fullErrorMessages = []; // clear any previous errors
   //utilize promises to wait for db query 
   return uniqueUsername(username).then(() => {
      isValidPassword(password);
      isValidUsername(username);
   }).then(() => {
      return errors.fullErrorMessages.length === 0
   })
}
const isValidUsername = (username) => {
   if(username.length < 6){
      errors.fullErrorMessages.push("Username must contain at least six characters")
   }
   return true
}

const isValidPassword = (password) => {
   if (password.length < 6){
      errors.fullErrorMessages.push("Password must contain at least six characters")
   }
   return true
}

const uniqueUsername = (username) => {
   //check db for preexisting username
   return db.query(
     "SELECT * FROM users WHERE username = $1",
     [username]
   ).then( results => {
      if (results.rows.length > 0){
         errors.fullErrorMessages.push("Username has already been taken")
      }
      return true
   });
}

module.exports = {
   find,
   errors,
   newUser
}