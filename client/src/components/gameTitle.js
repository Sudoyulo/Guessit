import React, { Fragment, useState } from "react";
import './gameTitle.css'
import friendIcon from '../images/friendIcon.png'
import help from '../images/help.png'
import stats from '../images/stats.png'
import settings from '../images/settings.png'

const GameTitle = () => {


  return (

    <div className="gameNav">
      <div className="left-icons">
        <img className="nav-icon" src={help} alt="help" />
        <img className="nav-icon" src={friendIcon} alt="friend" />
      </div>
      <h1 className="title"> miniWord </h1>
      <div className="right-icons">
        <img className="nav-icon" src={stats} alt="stats" />
        <img className="nav-icon" src={settings} alt="settings" />
      </div>
    </div>
  );
}
export default GameTitle;