import React, { Fragment, useState, useEffect } from "react";
import './gameTitle.css'
import friendIcon from '../images/friendIcon.png'
import help from '../images/help.png'
import stats from '../images/stats.png'
import settings from '../images/settings.png'
import axios from 'axios';

import Help from "./help";
import MiniFriends from "./miniFriends";
import Stats from "./stats";
import Blank from "./blank";
import Settings from "./settings";



const GameTitle = (props) => {

  const { leftSidebar, setLeftSidebar, rightSidebar, setRightSidebar } = props;
  const [user, setUser] = useState([]);
  const [game, setGame] = useState([]);


  const getUser = () => {
    axios('http://localhost:5001/users')
      .then(res => {
        console.log("RES USER: ", res.data)
        setUser(res.data[0])
      })
  }
  const getGame = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        console.log("RES GAME: ", res.data)
        setGame(res.data[0])
      })
  }

  useEffect(() => {
    getUser();
    getGame();
  }, []);

  const helpOnOff = () => {
    if (leftSidebar.type.name === "Help") {
      setLeftSidebar(<Blank />)
    } else {
      setLeftSidebar(<Help />)
    }
  }

  const minifriendOnOff = () => {
    if (leftSidebar.type.name === "MiniFriends") {
      setLeftSidebar(<Blank />)
    } else {
      setLeftSidebar(<MiniFriends />)
    }
  }

  const statsOnOff = () => {
    if (rightSidebar.type.name === "Stats") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Stats />)
    }
  }

  const settingsOnOff = () => {
    if (rightSidebar.type.name === "Settings") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Settings />)
    }
  }

  return (

    <div className="gameNav">
      <div className="left-icons">
        <button onClick={() => { helpOnOff() }} >
          <img className="nav-icon" src={help} alt="help" />
        </button>
        <button onClick={() => { minifriendOnOff() }} >
          <img className="nav-icon" src={friendIcon} alt="minifriends" />
        </button>
        <button className="game-info"> Your id: {user.player_id} </button>
      </div>

      <h1 className="title"> miniWord </h1>

      <div className="right-icons">
        <button className="game-info"> Game id: #{game.id}</button>
        <button onClick={() => { statsOnOff() }} >
          <img className="nav-icon" src={stats} alt="stats" />
        </button>
        <button onClick={() => { settingsOnOff() }}>
          <img className="nav-icon" src={settings} alt="settings" />
        </button>
      </div>
    </div >
  );
}

export default GameTitle;