import React, { useState, useEffect } from "react";
import './rightSidebar.css'

const Stats = (props) => {

  const [winTimes, setWinTimes] = useState([0, 0, 0, 0, 0, 0, 0])
  const { user, completedGames, gameCount } = props;

  let calcTimes = [0, 0, 0, 0, 0, 0, 0]; // 1 to 6 
  let totalGames = user.length;

  const calculateWinTimes = (userData) => {
    userData.forEach((game) => {
      calcTimes[game.turns_taken - 1]++;
      setWinTimes(calcTimes)
    })
  }
  useEffect(() => {
    calculateWinTimes(user);
  }, [])

  // let totalWins = winTimes.reduce((sum, i) => sum + i, 0);
  let totalWinPercent = Math.round((completedGames.length / gameCount) * 100); //minimum 30 to fill bar
  let maxWin = Math.max(...winTimes) //highest to get percentage of max
  let winPercent = winTimes.map((x) => (x / maxWin * 100) + 15) //min 15 to show 0

  return (

    <div className="right-sidebar">
      <div className="stat-title">
        Statistics
      </div>
      <div className="stats-container" >
        <div className="games-played">Games played: {totalGames}</div>
      </div>

      <div>Win%
        <div className="progress-bar" >
          <div className="win-percent" style={{ width: Math.max(totalWinPercent, 30) + "%" }} > {totalWinPercent}% </div>
        </div>

        <div>
          Guess Distribution
          <div className="distribution-bar" >
            <div className="bar-segment">1&nbsp;
              <div className="win-percent" style={{ width: winPercent[0] + "%" }} >{winTimes[0]}&nbsp;</div>
            </div>
            <div className="bar-segment">2&nbsp;
              <div className="win-percent" style={{ width: winPercent[1] + "%" }} >{winTimes[1]}&nbsp;</div>
            </div>
            <div className="bar-segment">3&nbsp;
              <div className="win-percent" style={{ width: winPercent[2] + "%" }} >{winTimes[2]}&nbsp;</div>
            </div>
            <div className="bar-segment">4&nbsp;
              <div className="win-percent" style={{ width: winPercent[3] + "%" }} >{winTimes[3]}&nbsp;</div>
            </div>
            <div className="bar-segment">5&nbsp;
              <div className="win-percent" style={{ width: winPercent[4] + "%" }} >{winTimes[4]}&nbsp;</div>
            </div>
            <div className="bar-segment">6&nbsp;
              <div className="win-percent" style={{ width: winPercent[5] + "%" }} >{winTimes[5]}&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
}

export default Stats;