import React, { useState, useEffect } from "react";
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
    axios('http://localhost:5001/users/1')
      .then(res => {
        // console.log("RES USER: ", res.data)
        setUser(res.data)
      })
  }
  const getGame = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        // console.log("RES GAME: ", res.data)
        setGame(res.data[0])
      })
  }

  useEffect(() => {
    getUser();
    getGame();
    // console.log("id", user[0].user_id);
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
      setLeftSidebar(<MiniFriends user_id={user[0].user_id} userAvatar={user[0].avatar_url} userInitials={user[0].initials} />)
    }
  }

  const statsOnOff = () => {
    if (rightSidebar.type.name === "Stats") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Stats user={user} />)
    }
  }

  const settingsOnOff = () => {
    if (rightSidebar.type.name === "Settings") {
      setRightSidebar(<Blank />)
    } else {
      setRightSidebar(<Settings />)
    }
  }
  //user[0].player_id
  return (

    <div className="gameNav">
      <div className="left-icons">
        <button onClick={() => { helpOnOff() }} >
          <img className="nav-icon" src={help} alt="help" />
        </button>
        <button onClick={() => { minifriendOnOff() }} >
          <img className="nav-icon" src={friendIcon} alt="minifriends" />
        </button>
        <div className="game-info"> Your id: <br /> {user[0] ? user[0].player_id : ""} </div>
      </div>


      <h1 className="title"> miniWord </h1>

      <div className="right-icons">
        <div className="game-info"> Game id: <br /> <div>#{game.id}</div> </div>
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