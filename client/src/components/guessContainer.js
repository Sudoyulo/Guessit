import React, { Fragment, useState, useEffect } from "react";
import './guessContainer.css'
import Keyboard from "./keyboard";

const GuessContainer = () => {

  const [message, setMessage] = useState("");
  const [pos, setPos] = useState({ row: 0, col: 0 })
  const [board, setBoard] = useState([
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " "]
  ])

  const solution = "LIGHT";

  const guessRows = board.map((row, rowIndex) => {
    return (
      <div key={row + rowIndex} className={"row row-" + rowIndex}> {
        row.map((col, colIndex) => {
          let color = "black";
          return (
            <div key={col + colIndex} style={{ backgroundColor: color }} className={"col col-" + colIndex}> {col}</div>
          )
        })
      }</div>
    );
  })

  const handleKeypress = (key) => {

    const copyBoard = [...board];

    const handleDelete = () => {
      if (pos.col > 0) {
        console.log("backspace")
        setPos({ ...pos, col: pos.col - 1 })
        copyBoard[pos.row][pos.col - 1] = " "
        setBoard(copyBoard)
      } else {
        setMessage("cant go back any further")
        setTimeout(() => { setMessage("") }, 2000)
      }
    }

    const handleEnter = () => {

      //pointer is out of bounds === 5 meaning 0-4 is filled up
      if (pos.col === 5) {
        let userGuess = board[pos.row].join('')

        if (solution === userGuess) {
          //correct
          setMessage("Perfect")
          //setTimeout(() => { setMessage("") }, 2000)
        } else {
          setPos({ ...pos, row: pos.row + 1, col: 0 })

          if (pos.row < 5) {
            //move on
            setMessage(userGuess + " is incorrect. Try again.") // 6-row tries left
            setTimeout(() => { setMessage("") }, 2000)
          } else {
            setMessage("Game over")
          }
        }

      } else { //reject the enter button
        setMessage("need a 5 letter word")
        setTimeout(() => { setMessage("") }, 2000)
      }
    }

    const addLetter = (letter) => {
      //pointer is in bounds < 5 meaning 0-4 is not filled up
      if (pos.col < 5) {
        copyBoard[pos.row][pos.col] = letter
        setBoard(copyBoard)
        setPos({ ...pos, col: pos.col + 1 })
      } else {
        setMessage('no space to enter letter ' + letter)
        setTimeout(() => { setMessage("") }, 2000)
      }
    }

    //handlers start here
    if (key === "<<") {
      handleDelete();
    } else if (key === "ENTER") {
      handleEnter();
    } else {
      addLetter(key);
    }

  }


  // useEffect(() => { //after >5 always show game over
  //   if (pos.row > 5) {
  //     setMessage("Game over")
  //   }
  // }, [pos])


  return (
    <Fragment >

      <div className="message">
        {message}
        <p>&nbsp;</p>
      </div>

      <div className="tile-container">
        {guessRows}
      </div>

      <Keyboard onKeypress={handleKeypress} />

    </Fragment>

  );

}
export default GuessContainer;