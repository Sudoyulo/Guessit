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
    pool.query('SELECT * , user_game.id AS ugid FROM users INNER JOIN avatars ON users.avatar_id = avatars.id INNER JOIN user_game ON users.id = user_game.user_id INNER JOIN games ON user_game.game_id = games.id WHERE users.id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

// const newUser = (id) => {

//   return pool.query('INSERT INTO users (date_started, player_id) VALUES (NOW(), $1) returning *;', [id])
//     .then(results => {

//       console.log("added new user", results.rows[0].id)
//       return results.rows;
//     })

// }

const newUser = (id) => {

  return pool.query("INSERT INTO users (initials, avatar_id, date_started, player_id) VALUES ('LHL', 1, NOW(), $1) returning *;", [id])
    .then(results => {
      pool.query('INSERT INTO user_game (user_id, game_id, started_on) VALUES ($1, 1, NOW());', [results.rows[0].id])
      // console.log("added new user", results.rows[0].id)
      return results.rows;
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

const getGame = (id) => {

  if (id === 0) {
    return pool.query('SELECT * FROM games ORDER BY id desc LIMIT 1')
      .then(results => {
        return results.rows[0];
      })
  }

  return pool.query('SELECT * FROM games WHERE id = $1', [id])
    .then(results => {
      return results.rows[0];
    })

}

const makeGame = (word) => {

  return pool.query('INSERT INTO games (solution) VALUES ($1);', [word])
    .then(results => {
      return results;
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

const setAvatar = (uid, aid) => {

  return pool.query('UPDATE users SET avatar_id = $1 WHERE id = $2;', [aid, uid])
    .then(results => {
      return results;
    })

}

const setInitials = (uid, key) => {
  return pool.query("UPDATE users SET initials = $1 WHERE id = $2;", [key, uid])
    .then(results => {
      return results;
    })
}

const createUserGame = (uid, gid, guess, time) => {

  let date = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit", })

  pool.query("INSERT INTO user_game (user_id, game_id, started_on) VALUES ($1,$2, NOW()) RETURNING *;", [uid, gid])
    .then(results => {
      console.log("results 2: ", results.rows[0].id)
      return pool.query("INSERT INTO guesses (user_game_id, guess, guessTimestamp) VALUES ($1, $2, $3)", [results.rows[0].id, guess, date])
      // .then(results => {
      //   console.log("results 1: ", results)
      //   return results;
      // })
      // return results;
    })
  // return results;
}


const getUserStats = (uid, gid) => {
  return pool.query("select * from user_game where user_id = $1 AND game_id = $2", [uid, gid])
    .then(results => {
      return results;
    })
}

const saveOneWin = (uid, gid, guess) => {

  let date = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit", })


  pool.query("INSERT INTO user_game (user_id, game_id, turns_taken, won_on, started_on) VALUES ($1,$2,1, NOW(), NOW()) returning *;", [uid, gid])
    .then(results => {

      pool.query("INSERT INTO guesses (user_game_id, guess, guessTimestamp) VALUES ($1, $2, $3)", [results.rows[0].id, guess, date])
        .then(results => {
          return results;
        })

    })

}



const saveWin = (turns, ugid) => {

  return pool.query("UPDATE user_game SET turns_taken = $1, won_on = NOW() WHERE id = $2;", [turns, ugid])
    .then(results => {
      return results;
    })

}


const saveGuess = (id, guess, time) => {

  return pool.query("INSERT INTO guesses (user_game_id, guess, guessTimestamp) VALUES ($1, $2, $3)", [id, guess, time])
    .then(results => {
      return results;
    })

}

const getGuesses = (ugid) => {

  return pool.query("SELECT guess, guesstimestamp FROM guesses INNER JOIN user_game ON user_game.id = guesses.user_game_id WHERE user_game.id = $1;", [ugid])
    .then(results => {
      return results;
    })

}


const getMyFriends = (myid) => {

  // console.log("entered get my friends query", myid)
  let myFriendsId = []

  return pool.query("SELECT you_are AS friendid FROM follows WHERE i_am = $1;", [myid])
    .then(results => {
      // return results.rows.map(() => { })
      results.rows.forEach(entry => myFriendsId.push(entry["you_are"]))
      // console.log("ids only", myFriendsId, results.rows)
      return results

    })

}

const addFollower = (me, you) => {
  //check if you is an invalid users
  if (me !== you) {
    pool.query("SELECT * FROM follows WHERE i_am= $1 AND you_are=$2;", [me, you])
      .then(results => {

        if (results.rows.length === 0) {
          pool.query("INSERT INTO follows (i_am, you_are) VALUES ($1,$2)", [me, you])

        }

      })
  }

}


module.exports = {
  getUsers,
  getUser,
  newUser,
  getGames,
  getGame,
  makeGame,
  getAvatars,
  setAvatar,
  setInitials,
  createUserGame,
  getUserStats,
  saveOneWin,
  saveWin,
  saveGuess,
  getGuesses,
  getMyFriends,
  addFollower
}