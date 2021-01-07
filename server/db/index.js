const { Pool } = require("pg");
const pool = new Pool({
   user: 'omar',
   host: 'localhost',
   database: 'memories',
   password: 'password',
   port: 5432,
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
