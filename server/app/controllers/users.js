const db = require("../../db");

module.exports = { 
   getUsers: (request, response) => {
      db.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
         if (error) {
            throw error;
         }
         response.status(200).json(results.rows);
      });
   }
}