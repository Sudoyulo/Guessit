// load .env data into process.env
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");

// DATABASE CONNECTION
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const pool = new Pool(dbParams);
const { getUsers, getUser, newUser, getGames, makeGame, getGame, getAvatars, setAvatar, setInitials, createUserGame, getUserStats, saveOneWin, saveWin, saveGuess, getGuesses, getMyFriends, addFollower } = require('./query_helpers')

app.use(cors());
app.use(express.json()); //req,.body

//get all users
app.get('/users', (req, res) => {
  getUsers()
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

// get one user
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  getUser(id)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
})

//insert new user
app.put("/new_users/:id", (req, res) => {
  const { id } = req.params;
  newUser(id)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send("Not created"); })
})

//save avatar as new avatar id
app.put("/users/:id/avatar/:avatar_id", (req, res) => {
  const { id, avatar_id } = req.params;
  setAvatar(id, avatar_id)
    .then(response => { res.status(200).send("Updated"); })
})

//save initials to user
app.put("/users/:id/initials/:str", (req, res) => {
  const { id, str } = req.params;
  setInitials(id, str)
    .then(response => { res.status(200).send("Updated"); })
})

//get all games info
app.get('/games', (req, res) => {
  getGames()
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//get information about one game
app.get('/game/:id', (req, res) => {
  let { id } = req.params;
  if (id === "undefined") { id = 0; }
  getGame(id)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//add a new game with word as the solution
app.put('/games/:word', (req, res) => {
  const { word } = req.params;
  makeGame(word)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//get all avatars from the database
app.get('/avatars', (req, res) => {
  getAvatars()
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//add a new user game. a user has started a new game. save the guess
app.put('/new_user_game/:uid/:gid/:guess/:time', (req, res) => {
  const { uid, gid, guess, time } = req.params;
  createUserGame(uid, gid, guess, time)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

// find from user_game an existing game
app.get('/user_game/:uid/:gid', (req, res) => {
  const { uid, gid } = req.params;
  getUserStats(uid, gid)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//create and save a one turn win
app.put('/win_one_turn/:uid/:gid/:guess', (req, res) => {
  const { uid, gid, guess } = req.params;
  saveOneWin(uid, gid, guess)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//set game as completed in x turns
app.put('/win_user_game/:turns/:ugid', (req, res) => {
  const { turns, ugid } = req.params;
  saveWin(turns, ugid)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//update an existing guess row
app.put('/guesses/:user_game_id/:guess/:time', (req, res) => {
  const { user_game_id, guess, time } = req.params;
  saveGuess(user_game_id, guess, time)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//get all guesses of one game
app.get('/guesslog/:ugid', (req, res) => {
  const { ugid } = req.params;
  getGuesses(ugid)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//get all friends of one user
app.get('/getmyfriends/:myid', (req, res) => {
  const { myid } = req.params;
  getMyFriends(myid)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

//add a user as a follower
app.put('/newfollow/:me/:you', (req, res) => {
  const { me, you } = req.params;
  addFollower(me, you)
    .then(response => { res.status(200).send(response); })
    .catch(error => { res.status(500).send(error); })
});

app.listen(5001, () => {
  console.log("connected to port 5001")
});