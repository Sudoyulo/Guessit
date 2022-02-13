import React from "react";
import './rightSidebar.css'

const Stats = () => {

  const winPercent = 10;

  return (

    <div className="right-sidebar">
      <div className="stat-title">
        Statistics
      </div>
      <div className="stats-container" >

        <div>
          Games played
        </div>

        <div className="progress-bar" >
          <div className="win-percent" style={{ width: winPercent + "%" }} >Win %</div>
        </div>
        <div>
        </div>
        <div>
          Guess Distribution
        </div>
      </div>
    </div >

  );
}

export default Stats;