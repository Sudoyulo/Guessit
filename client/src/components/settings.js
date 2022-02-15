import React, { useState, useEffect } from "react";
import axios from "axios";
import './rightSidebar.css'

const Settings = (props) => {

  const [gameAmount, setGameAmount] = useState([]);
  const [search, setSearch] = useState(1);
  const [completedGames, setCompletedGames] = useState([]);
  const { getGame, resetBoard, user } = props;

  const getGames = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        let list = []
        res.data.forEach((id) => {
          list.push(id.id)
        })
        setGameAmount(list);

      })
  }

  const makeGame = (word) => {
    axios.put('http://localhost:5001/games/' + word)
      .then(res => {
        console.log("inserted new game")
        getGames();
      })
  }



  const readCompletedgames = (userId) => {

    let list = [];
    userId.forEach((game) => {
      list.push(game.game_id);
    })

    setCompletedGames(list)
    console.log(completedGames)
  }


  useEffect(() => {
    readCompletedgames(user);
    getGames();
  }, [])

  const gameLinks = gameAmount.map((gameid) => {
    let icon = "🛑 Not yet";

    if (completedGames.includes(gameid)) {
      icon = "✅ Done";
    }

    return (
      <option key={gameid} value={gameid}> {gameid} {icon} </option>
    )
  })

  return (

    <div className="right-sidebar">
      <p className="stat-title">Settings </p>
      <div className="setting-container">
        Load a game
        <select value={search} onChange={(e) => { setSearch(e.target.value) }}>
          {gameLinks}
        </select>
        <button onClick={() => { getGame(search); resetBoard(); }}>Load</button>
      </div>
      <div className="setting-container">
        Create a game
        <button onClick={() => makeGame("HELLO")}>Create!</button>
      </div>


    </div >
  );

}
export default Settings;