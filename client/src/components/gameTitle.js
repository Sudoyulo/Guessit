import React, { useState, useEffect } from "react";
import './gameTitle.css'
import friendIcon from '../images/friendIcon.png'
import help from '../images/help.png'
import stats from '../images/stats.png'
import settings from '../images/settings.png'
import axios from 'axios';

import Help from "./help";
import Followers from "./followers";
import Stats from "./stats";
import Blank from "./blank";
import Settings from "./settings";
import GuessContainer from './guessContainer';


const GameTitle = (props) => {

  const { leftSidebar, setLeftSidebar, rightSidebar, setRightSidebar } = props;
  const [user, setUser] = useState([]);
  const [game, setGame] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [hangingGames, setHangingGames] = useState([]);
  const [gameCount, setGameCount] = useState(0)

  const [board, setBoard] = useState([
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "]
  ])

  const [pos, setPos] = useState({ row: 0, col: 0 })

  const resetBoard = () => {
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

  const getUser = () => {
    axios('http://localhost:5001/users/1')
      .then(res => {
        // console.log("RES USER: ", res.data)
        setUser(res.data)
      })
  }
  const getGames = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        setGame(res.data[0])

      })
  }

  const getGame = (id) => {
    axios('http://localhost:5001/game/' + id)
      .then(res => {
        setGame(res.data)

      })
  }

  const readCompletedgames = (user) => {
    let tbd = []
    let complete = [];
    let gCount = 0;
    user.forEach((game) => {
      // console.log("each game", game);
      gCount++;
      if (game.won_on) {
        // console.log("win")
        complete.push(game.game_id)
      } else {
        // console.log("inprogress")
        tbd.push(game.game_id)
      }

    })
    setCompletedGames(complete);
    setHangingGames(tbd);
    setGameCount(gCount);
  }

  useEffect(() => {
    getUser();
  }, []);


  useEffect(() => {
    getGames();
    getGame();;
  }, [user]);

  useEffect(() => {

    readCompletedgames(user);
  }, [user]);

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
      setLeftSidebar(<Followers user_id={user[0].user_id} userinfo={user} userAvatar={user[0].avatar_url} userInitials={user[0].initials} />)
    }
  }

  const statsOnOff = () => {
    if (leftSidebar.type.name === "Stats") {
      setLeftSidebar(<Blank />)
    } else {
      setLeftSidebar(<Stats user={user} completedGames={completedGames} gameCount={gameCount} />)
    }
  }

  const settingsOnOff = () => {
    if (rightSidebar.type.name === "Settings") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Settings resetBoard={resetBoard} getGame={getGame} completedGames={completedGames} hangingGames={hangingGames} getUser={getUser} />)
    }
  }
  //user[0].player_id

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
          <div className="game-info"> Your id: <br /> {user[0] ? user[0].player_id : ""} </div>
        </div>


        <h1 className="title"> miniWord </h1>

        <div className="right-icons">
          <div className="game-info"> Game id: <br /> <div>#{game.id}</div> </div>
          <button onClick={() => { helpOnOff() }} >
            <img className="nav-icon" src={help} alt="help" />
          </button>
          <button onClick={() => { settingsOnOff() }}>
            <img className="nav-icon" src={settings} alt="settings" />
          </button>
        </div>

      </div >

      <GuessContainer completedGames={completedGames} board={board} setBoard={setBoard} pos={pos} setPos={setPos} solution={game.solution} user={user} gameId={game.id} />
    </div>
  );
}

export default GameTitle;