const { Pool } = require("pg");
const dbParams = require("./lib/db");
const pool = new Pool(dbParams);


const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getGames = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM games', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getAvatars = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM avatars', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getStats = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM user_game', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

module.exports = {
  getUsers,
  getGames,
  getAvatars,
  getStats
}