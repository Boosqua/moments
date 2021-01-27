const { Pool, Client } = require("pg");
const { pgPool } = require("../config/keys")
const pool = process.env.NODE_ENV === "production" ?
   new Pool({
      connectionString: pgPool,
      ssl: true,
   }) : 
   new Pool(pgPool)

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

