// load .env data into process.env
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");

// DATABASE CONNECTION
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const pool = new Pool(dbParams);
const { getUsers, getUser, getGames, makeGame, getGame, getAvatars, setAvatar, setInitials, createUserGame, getUserStats, saveOneWin, saveWin, saveGuess } = require('./query_helpers')

app.use(cors());
app.use(express.json()); //req,.body

//routes
app.get('/users', (req, res) => {

  getUsers()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  //comes in as a string
  getUser(id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put("/users/:id/avatar/:avatar_id", (req, res) => {

  const { id, avatar_id } = req.params;

  setAvatar(id, avatar_id)
    .then(response => {
      res.status(200).send("Updated");
    })
    .catch(error => {
      console.log("Error in avatar update")
      res.status(500).send("Not updated");
    })

})

app.put("/users/:id/initials/:str", (req, res) => {

  const { id, str } = req.params;

  setInitials(id, str)
    .then(response => {
      res.status(200).send("Updated");
    })
    .catch(error => {
      console.log("Error in avatar update")
      res.status(500).send("Not updated");
    })

})

app.get('/games', (req, res) => {

  getGames()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

app.get('/game/:id', (req, res) => {

  let { id } = req.params;

  if (id === "undefined") {
    id = 0;
  }

  getGame(id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

app.put('/games/:word', (req, res) => {

  const { word } = req.params;

  makeGame(word)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});



app.get('/avatars', (req, res) => {

  getAvatars()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});


app.put('/new_user_game/:uid/:gid/:guess', (req, res) => {

  const { uid, gid, guess } = req.params;

  createUserGame(uid, gid, guess)
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })

});

// find from user_game an existing game
app.get('/user_game/:uid/:gid', (req, res) => {

  const { uid, gid } = req.params;

  getUserStats(uid, gid)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

app.put('/win_one_turn/:uid/:gid/:guess', (req, res) => {

  const { uid, gid, guess } = req.params;

  saveOneWin(uid, gid, guess)
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })

});


//set game as completed in x turns
app.put('/win_user_game/:turns/:ugid', (req, res) => {

  const { turns, ugid } = req.params;

  saveWin(turns, ugid)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

//update an existing guess row
app.put('/guesses/:user_game_id/:guess', (req, res) => {

  const { user_game_id, guess } = req.params;

  saveGuess(user_game_id, guess)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

//make new guesses data
// app.put("/guess/new/:user_game_id/:guess", (req, res) => {

//   const { user_game_id, guess } = req.params;

//   saveNewGuess(user_game_id, guess)
//     .then(response => {
//       res.status(200).send(response);
//     })
//     .catch(error => {
//       res.status(500).send(error);
//     })

// });


app.listen(5001, () => {
  console.log("connected to port 5001")
});