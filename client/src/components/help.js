import React, { useState } from "react";
import classNames from "classnames";
import './leftSidebar.css'


const Help = () => {

  return (

    <div className="left-sidebar">
      <div className="help-title">
        Help
      </div>
      <div className="help-container" >
        <div>
          Guess the five letter word using the keypad below! <br />
          Click enter to check your results!
        </div>
        <div>
          Green letters mean the letter is in the exact position as the answer.
          <br /><br />
          Yellow letters mean the letter is within the word!
        </div>
      </div>
    </div >
  );

}
export default Help;