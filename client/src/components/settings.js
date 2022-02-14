import React, { useState, useEffect } from "react";
import axios from "axios";
import './rightSidebar.css'

const Settings = () => {

  const [gameAmount, setGameAmount] = useState([])

  const getGames = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        let list = []
        res.data.forEach((id) => {
          list.push(id.id)
        })
        setGameAmount(list)
      })
  }

  const makeGame = (word) => {
    axios.put('http://localhost:5001/games/' + word)
      .then(res => {
        console.log("inserted new game")
        getGames();
      })
  }

  useEffect(() => {
    getGames();
  }, [])

  const gameLinks = gameAmount.map((gameid) => {
    return (
      <option value={gameid}> {gameid}</option>
    )
  })

  return (

    <div className="right-sidebar">
      <p className="stat-title">Settings </p>
      <div className="setting-container">
        Find a game
        <select onChange={(e) => { console.log(e.target.value) }}>
          {gameLinks}
        </select>
        <button>Search</button>
      </div>
      <div className="setting-container">
        Create a game
        <button onClick={() => makeGame("HELLO")}>Create!</button>
      </div>


    </div >
  );

}
export default Settings;