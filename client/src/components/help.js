import React from "react";
import './leftSidebar.css'
import howTo from '../images/howTo.png'
import examples from '../images/examples.png'

const Help = () => {

  return (

    <div className="left-sidebar">
      <div className="side-title">
        Help
      </div>
      <div className="help-container" >
        <div>
          Each guess must be a valid five-letter word <br />
          Hit the 'ENTER' button to submit your guess!
        </div>
        <img className="help" src={examples} alt="How to play" />
        <div>

        </div>
      </div>
    </div >
  );

}
export default Help;