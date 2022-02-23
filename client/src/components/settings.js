import React, { useState, useEffect } from "react";
import axios from "axios";
import './rightSidebar.css';
import './guessContainer.css';
import complete from '../images/complete.png'
import incomplete from '../images/incomplete.png'
import { getRandomWord } from "../words/wordList";

const Settings = (props) => {

  const { user, resetBoard, loadBoard, completedGames, hangingGames, getCurrentGame } = props;

  
  const [gameAmount, setGameAmount] = useState([]);
  const [search, setSearch] = useState();
  const [settingMessage, setSettingMessage] = useState("");
  const [game, setGame] = useState([]);
  
  
  //remove colors from keyboard
  const resetKeyboard = () => {
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']

    keys.forEach(key => {
      const colours = ['green-overlay', 'yellow-overlay', 'grey-overlay']
      colours.forEach(colour => {
        document.getElementById(key).classList.remove(colour)
      })
    })
  }

  //request all games played from the database
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

  //create a game in the database
  const makeGame = (word) => {
    axios.put('http://localhost:5001/games/' + word)
      .then(res => {
        setSettingMessage("New game created. It's ready to be loaded.")
        setTimeout(() => { setSettingMessage("") }, 2000)
        getGames();
      })
  }

  //load button handler based on game status of completed, incomplete or new
  const loadOrReset = () => {

    if (completedGames.includes(search)) {
      setSettingMessage("You have already completed this game.")
      setTimeout(() => { setSettingMessage("") }, 2000)
      getGuesses();
    } else if (hangingGames.includes(search)) {
      getGuesses();
      setSettingMessage("Previous game loaded.")
      setTimeout(() => { setSettingMessage("") }, 2000)
    } else {
      setSettingMessage("New game Loaded.")
      setTimeout(() => { setSettingMessage("") }, 2000)
      resetBoard();
    }
    getGames();
  }

  //grab guesses from the database using the user game id
  const getGuesses = () => {
    if (user[0] && search) {
      axios('http://localhost:5001/user_game/' + user[0].user_id + "/" + search)
        .then(res => {
          axios('http://localhost:5001/guesslog/' + res.data.rows[0].id)
            .then(res => {
              loadBoard(res.data.rows, game.solution);
            })
        })
    }
  }

  const getGame = (id) => {
    axios('http://localhost:5001/game/' + id)
      .then(res => {
        setGame(res.data)
      })
  }

  useEffect(() => {
    getGames();
    getGame(search);
    
  }, [search])

  const gameLinks = gameAmount.map((gameid) => {
    let icon = "❎ Un-Played";

    if (completedGames.includes(gameid)) {
      icon = "✅ Played";
    } else if (hangingGames.includes(gameid)) {
      icon = "⌛ Ongoing";
    }

    return (<option key={gameid} value={gameid}>{`GAME #${gameid}`} {icon} </option>)
  })

  return (

    <div className="right-sidebar">
      <p className="game-title">GAME SETTINGS </p>
      <div className="message">
        {settingMessage}
        <p>&nbsp;</p>
      </div>

      <div className="choose-game"><p>Load previous game</p><p>- or -</p><p>Create a new one!</p></div>

      <div className="setting-container">
        <select className="games-list" value={search} onChange={(e) => { setSearch(Number(e.target.value)) }}>
          {gameLinks}
        </select>
        <button className='play-button' onClick={() => { getCurrentGame(search); getGame(search); loadOrReset(); resetKeyboard(); }}>Load Game</button>
        <button className='create-button' onClick={() => makeGame(getRandomWord())}>Create!</button>
      </div>
    </div >
  );

}
export default Settings;