import React, { useState, useEffect } from "react";
import './gameTitle.css'
import friendIcon from '../images/friendIcon.png'
import help from '../images/help.png'
import stats from '../images/graph.png'
import settings from '../images/settings.png'
import axios from 'axios';

import Help from "./help";
import Followers from "./followers";
import Stats from "./stats";
import Blank from "./blank";
import Settings from "./settings";
import GuessContainer from './guessContainer';

const GameTitle = (props) => {

  const { leftSidebar, setLeftSidebar, rightSidebar, setRightSidebar, newUserData } = props;
  const [allGames, setAllGames] = useState([])
  // const [user, setUser] = useState(newUserData);
  const [game, setGame] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [hangingGames, setHangingGames] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const [guessList, setGuessList] = useState([]);
  const [pos, setPos] = useState({ row: 0, col: 0 })

  const [board, setBoard] = useState([
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "]
  ])

  const resetBoard = () => {
    console.log("resetBoard")
    setBoard([
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " "]
    ])
    setPos({ row: 0, col: 0 })
  };

  const changeKeyColour = (key, colour) => {
    const button = document.getElementById(key)
    button.classList.add(colour)
  }

  //if continuing or loading a previous game, set board with guesses
  const loadBoard = (stats, solution) => {

    let guesses = [];
    stats.forEach((entry) => { guesses.push(entry.guess.split('')) })
    setPos({ row: guesses.length, col: 0 })

    for (let i = guesses.length; i < 6; i++) {
      guesses.push([" ", " ", " ", " ", " "])
    }

    setBoard(guesses)
    boardCSS(board, solution)
  };

  const boardCSS = (guesses, solution) => {

    guesses.forEach((userGuess, rowindex) => {

      let answer = solution
      let checkSolution = answer
      let guess = []

      userGuess.forEach((tile, colIndex) => {

        tile = document.getElementById(rowindex.toString() + colIndex.toString())

        if (!tile.textContent) {
          tile.classList.add('default')
        }
        guess.push({ letter: tile.textContent, colour: 'grey-overlay' })

        guess.forEach((guess, index) => {
          if (guess.letter === answer[index]) {
            guess.colour = 'green-overlay'
            checkSolution = checkSolution.replace(guess.letter, '')
          }

          if (checkSolution.includes(guess.letter) && guess.colour !== 'green-overlay') {
            guess.colour = 'yellow-overlay'
            checkSolution = checkSolution.replace(guess.letter, '')
          }

          if (guess.letter === ' ') {
            guess.colour = 'default'
          }
        })

        tile.classList.add(guess[colIndex].colour)
        changeKeyColour(guess[colIndex].letter, guess[colIndex].colour)

      })
    })
  };

  //get list of all games. On load, loads the latest game.
  const getGames = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        setAllGames(res.data.reverse())
        setGame(res.data[0])
      })
  }

  //get game with id
  const getCurrentGame = (id) => {
    axios('http://localhost:5001/game/' + id)
      .then(res => {
        setGame(res.data)
      })
  }

  //sort all played games between complete and incomplete games for the stats page
  const readCompletedgames = (user) => {
    let tbd = []
    let complete = [];
    let gCount = 0;
    user.forEach((game) => {
      gCount++;
      if (game.won_on) {
        complete.push(game.game_id)
      } else {
        tbd.push(game.game_id)
      }
    })

    setCompletedGames(complete);
    setHangingGames(tbd);
    setGameCount(gCount);
  }

  useEffect(() => {
    getGames();
    getCurrentGame();
    readCompletedgames(newUserData);
  }, [newUserData]);

  const helpOnOff = () => {
    if (rightSidebar.type.name === "Help") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Help />)
    }
  }

  const followerOnOff = () => {
    if (leftSidebar.type.name === "Followers") {
      setLeftSidebar(<Blank />)
    } else {
      setLeftSidebar(<Followers user_id={newUserData[0].user_id} userinfo={newUserData} userAvatar={newUserData[0].avatar_url} userInitials={newUserData[0].initials} gameid={game.id} />)
    }
  }

  const statsOnOff = () => {
    if (leftSidebar.type.name === "Stats") {
      setLeftSidebar(<Blank />)
    } else {
      setLeftSidebar(<Stats user={newUserData} completedGames={completedGames} gameCount={gameCount} />)
    }
  }

  const settingsOnOff = () => {
    if (rightSidebar.type.name === "Settings") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Settings user={newUserData} resetBoard={resetBoard} loadBoard={loadBoard} setCSS={boardCSS} completedGames={completedGames} hangingGames={hangingGames} board={board} solution={game.solution} game={game} getCurrentGame={getCurrentGame} />)
    }
  }

  return (

    <div className="main-view">
      <div className="gameNav">
        <div className="left-icons">
          <button onClick={() => { statsOnOff() }} >
            <img className="nav-icon" src={stats} alt="stats" />
          </button>
          <button onClick={() => { followerOnOff() }} >
            <img className="nav-icon" src={friendIcon} alt="follower" />
          </button>
          <div className="game-info"> Your ID: <br />
            <div>{newUserData[0] ? newUserData[0].user_id : ""}</div>
          </div>
        </div>



        <div className="nav-bouncing-text">
          <div className="nav-b">G</div>
          <div className="nav-o">u</div>
          <div className="nav-u">e</div>
          <div className="nav-n">s</div>
          <div className="nav-c">s</div>
          <div className="nav-e">i</div>
          <div className="nav-r">t</div>
          {/* <div className="nav-d">D</div> */}
        </div>

        <div className="right-icons">
          <div className="game-info"> Game: <br />
            <div>#{game.id}</div>
          </div>
          <button onClick={() => { helpOnOff() }} >
            <img className="nav-icon" src={help} alt="help" />
          </button>
          <button onClick={() => { settingsOnOff() }}>
            <img className="nav-icon" src={settings} alt="settings" />
          </button>
        </div>

      </div >
      <div className="middle-containers">

        <GuessContainer completedGames={completedGames} board={board} setBoard={setBoard} pos={pos} setPos={setPos} solution={game.solution} user={newUserData} game={game} gameId={game.id} guessList={guessList} boardCSS={boardCSS} />

      </div>
    </div>
  );
}

export default GameTitle;