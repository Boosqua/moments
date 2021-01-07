const { _router } = require('../../app')
const db = require('../../db')

   const find = (id) => {
      return db.query(
         'SELECT id, username FROM users WHERE id = $1', 
         [id]).then( results => {
            return results.rows[0]
         })
   }


module.exports = {
   find
}