const Pool = require("pg").Pool;

const pool = new Pool({

  user: "development",
  password: "development",
  port: 5432,
  database: "perntodo"

})

module.exports = pool;