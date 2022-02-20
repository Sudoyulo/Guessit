import React, { useState, useEffect } from "react";
import axios from "axios";
import './replayContainer.css'


const ReplayContainer = (props) => {

  const { solution, flipTiles, vsUgid } = props;
  const [timestamp, setTimestamp] = useState([])
  const [guessList, setGuessList] = useState([])

  const [board, setBoard] = useState([
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "]
  ])

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


  const convertIntoMiliseconds = (time) => {

    let msTime = []
    let zeroTime = 0;
    let splitGuess = []

    time.forEach((record) => {
      const minute = Number(record.slice(0, 2)) * 60000
      const second = Number(record.slice(3)) * 1000
      msTime.push(Number(minute + second))
    })

    zeroTime = msTime[0];
    msTime = msTime.map((spot) => Number(spot) - Number(zeroTime))

    // console.log("convert times", time)
    splitGuess = guessList.map(guess => guess.split(''))
    console.log("msTime", msTime, splitGuess)

    msTime.forEach((time, index) => {
      setTimeout(() => {
        console.log(guessList[index])
      }, [time])

    })

    setBoard(splitGuess)



  }





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
      <button onClick={() => { convertIntoMiliseconds(timestamp) }}>Play</button>
      {guessRows}
      {/* {guessList}{timestamp} */}
      {solution}
    </div >
  );

}
export default ReplayContainer;