const { Pool } = require("pg");
const { pgPool } = require("../config/keys")

const pool = new Pool({connectionString: pgPool});
pool.query( "INSERT INTO users (username, password) VALUES (WORKING, MAYBE)" )
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
