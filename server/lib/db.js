// the db data connection should be in this folder
//database name should ne miniword, un/pw, port is the same


// const Pool = require("pg").Pool;

// const pool = new Pool({

//   user: "development",
//   password: "development",
//   port: 5432,
//   database: "miniword"

// })

// module.exports = pool;

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

module.exports = dbParams;
