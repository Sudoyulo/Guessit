import React, { Fragment, useState } from "react";
import './stats.css'


const Stats = () => {


  return (


    <div className="right-sidebar">
      <div className="stat-title">
        Statistics
      </div>
      <div className="stats-container" >

        <div>
          Games played
        </div>
        <div>
          Win %
        </div>
        <div>
          Guess Distribution
        </div>
      </div>

    </div >


  );

}
export default Stats;