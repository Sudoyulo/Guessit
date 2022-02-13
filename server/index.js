// load .env data into process.env
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors");

// DATABASE CONNECTION
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const pool = new Pool(dbParams);
const { getUsers, getUser, getGames, getAvatars, getStats } = require('./query_helpers')


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




app.get('/games', (req, res) => {

  getGames()
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

app.get('/stats', (req, res) => {

  getStats()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })

});

app.listen(5001, () => {
  console.log("connected to port 5001")
});