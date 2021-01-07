const db = require("../../db");

module.exports = { 
   index: (request, response) => {
      db.query(
         "SELECT * FROM users ORDER BY id ASC", 
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
         'SELECT * FROM users WHERE id = $1', 
         [id], 
         (error, results) => {
            if (error) {
               throw error;
            }
            response.status(200).json(results.rows)
         }
      );
   },
   createUser: (request, response) => {
      const { name, email } = request.body

      db.query(
         'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
         [name, email],
         (error, results) => {
            if( error ) {
               throw error;
            }
            console.log(results)
            response.status(201).json(results.rows)
         }
      )
   }, 
   updateUser: (request, response) => {
      const id = parseInt(request.params.id);
      const { name, email } = request.body;

      db.query(
         'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
         [name, email, id],
         (error, results) => {
            if( error ) {
               throw error
            }
            response.status(200).json(results.rows)
         }
      )
   },
   deleteUser: (request, response) => {
      const id = parseInt(request.params.id);
      
      db.query(
         'DELETE FROM users WHERE id = $1 RETURNING *',
         [id],
         (error, results) => {
            if( error ) {
               throw error
            }
            response.status(200).send(results.rows)
         }
      )
   }
}