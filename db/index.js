const { Pool, Client } = require("pg");
const { pgPool } = require("../config/keys")

const pool = new Pool({
  connectionString: pgPool,
  ssl: true
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

