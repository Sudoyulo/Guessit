import React, { useState, useEffect } from "react";
import axios from "axios";
import './replayContainer.css'


const ReplayContainer = (props) => {



  const { board, solution, flipTiles, vsUgid } = props;
  const [timestamp, setTimestamp] = useState([])
  const [guessList, setGuessList] = useState([])


  const getVs = (ugid) => {
    console.log("getting game:", ugid)

    axios('http://localhost:5001/guesslog/' + ugid)
      .then(res => {
        // console.log("loaded guesses", res.data.rows)
        let guesses = [];
        let gamestamp = [];
        console.log("guesslog?", res.data.rows)

        res.data.rows.forEach((entry) => {
          guesses.push(entry.guess)
          gamestamp.push(entry.guesstimestamp)
        })

        setGuessList(guesses)
        setTimestamp(gamestamp)

      })
  }

  useEffect(() => {
    getVs(vsUgid)
  }, [vsUgid])



  // console.log("guessList: ", guessList)
  // console.log("Im in the replay", props.timestamp, props.guessList) //and solution
  //convert min and s to ms. find the difference. map props.timestamp, set timeout and css for each line dont reveal words on replay.
  const guessRows = board.map((row, rowIndex) => {
    return (
      <div key={row + rowIndex} className={"row row-" + rowIndex}> {
        row.map((col, colIndex) => {
          return (
            <div id={rowIndex.toString() + colIndex.toString()} key={col + colIndex} className={"col col-" + colIndex}>{col}</div>
          )
        })
      }</div>
    );
  })



  return (

    <div className="replay-box">
      {/* {guessRows} */}
      {guessList}{timestamp}
    </div >
  );

}
export default ReplayContainer;