import React, { useState, useEffect } from "react";
import axios from "axios";
import './rightSidebar.css';
// import './keyboard.css';
import './guessContainer.css';
import complete from '../images/complete.png'
import incomplete from '../images/incomplete.png'
import { getRandomWord } from "../words/wordList";

const Settings = (props) => {

  const { user, getGame, resetBoard, loadBoard, completedGames, hangingGames } = props;

  const [gameAmount, setGameAmount] = useState([]);
  const [search, setSearch] = useState(1);
  const [settingMessage, setSettingMessage] = useState("");

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
        console.log("inserted new game", res)
        setSettingMessage("New game created. It's ready to be loaded.")
        setTimeout(() => { setSettingMessage("") }, 2000)
        getGames();
      })
  }

  const loadOrReset = () => {
    // console.log("load or reset game:", user[0].user_id, search)

    if (completedGames.includes(search)) {
      console.log("completed game")
      setSettingMessage("You have already completed this game.")
      setTimeout(() => { setSettingMessage("") }, 2000)
      getGuesses();
      // loadBoard();
    } else if (hangingGames.includes(search)) {
      getGuesses();
      console.log("hanging game")
      setSettingMessage("Previous game loaded.")
      setTimeout(() => { setSettingMessage("") }, 2000)
      // loadBoard();
    } else {
      console.log("new game")
      setSettingMessage("New game Loaded.")
      setTimeout(() => { setSettingMessage("") }, 2000)
      resetBoard();
    }
    getGames();
  }

  const getGuesses = () => {
    // console.log("trying to load guesses", user[0].user_id, search)

    if (user[0] && search) {
      // console.log("fetching", user[0].user_id, gameId)
      axios('http://localhost:5001/user_game/' + user[0].user_id + "/" + search)
        .then(res => {
          // console.log("usergame", res.data.rows[0])

          axios('http://localhost:5001/guesslog/' + res.data.rows[0].id)
            .then(res => {
              // console.log("loaded guesses", res.data.rows)
              loadBoard(res.data.rows);
            })
        })
    }
  }

  useEffect(() => {
    getGames();
  }, [])

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
        <button className='play-button' onClick={() => { getGame(search); loadOrReset(); resetKeyboard(); }}>Load Game</button>
        <button className='create-button' onClick={() => makeGame(getRandomWord())}>Create!</button>
      </div>
      {/* <div className="setting-container">
        <p className="make-game">MAKE A GAME!</p>
      </div> */}

    </div >
  );

}
export default Settings;