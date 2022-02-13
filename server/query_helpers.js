const { Pool } = require("pg");
const dbParams = require("./lib/db");
const pool = new Pool(dbParams);


const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

//user, avatar, user_game, game, (guesses, followers)
const getUser = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM users INNER JOIN avatars ON users.avatar_id = avatars.id INNER JOIN user_game ON users.id = user_game.user_id INNER JOIN games ON user_game.game_id = games.id WHERE users.id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getGames = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM games', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getAvatars = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM avatars', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const getStats = () => {
  return new Promise(function (resolve, reject) {
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
  getUser,
  getGames,
  getAvatars,
  getStats
}