const { Pool } = require("pg");
const { pgPool } = require("../config/keys")

const pool = new Pool({pgPool.DATABASE_URL,});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
