import React from "react";
import './leftSidebar.css'
import howTo from '../images/howTo.png'
import examples from '../images/examples.png'

const Help = () => {

  return (

    <div className="left-sidebar">
      <div className="side-title">
        HOW TO PLAY
      </div>
      <div className="help-container" >
        <div className="rules">
        ⚠️ Must guess a valid word ⚠️ 
        </div>
        <img className="help" src={examples} alt="How to play" />
        <div>

        </div>
      </div>
    </div >
  );

}
export default Help;