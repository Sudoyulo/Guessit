import React, { Fragment, useState } from "react";
import './gameTitle.css'
import friendIcon from '../images/friendIcon.png'
import help from '../images/help.png'
import stats from '../images/stats.png'
import settings from '../images/settings.png'

import Stats from "./stats";
import Blank from "./blank";

const GameTitle = (props) => {

  const { rightSidebar, setRightSidebar } = props;

  const statsOnOff = () => {

    if (rightSidebar.type.name === "Stats") {
      console.log("Stats")
      setRightSidebar(<Blank />)
    } else {
      console.log("Blank")
      setRightSidebar(<Stats />)
    }

  }

  return (

    <div className="gameNav">
      <div className="left-icons">
        <img className="nav-icon" src={help} alt="help" />
        <img className="nav-icon" src={friendIcon} alt="friend" />
      </div>
      <h1 className="title"> miniWord </h1>
      <div className="right-icons">
        <button onClick={() => { statsOnOff() }} >
          <img className="nav-icon" src={stats} alt="stats" />
        </button>
        <button  >
          <img className="nav-icon" src={settings} alt="settings" />
        </button>
      </div>
    </div >
  );
}
export default GameTitle;