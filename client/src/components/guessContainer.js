import React, { useState, useEffect } from "react";
import axios from "axios";
import './guessContainer.css'
import Keyboard from "./keyboard";
import { checkWord } from "../words/wordList";

const GuessContainer = (props) => {

  const { board, setBoard, solution, pos, setPos, user, gameId, completedGames } = props;

  const [message, setMessage] = useState("");
  const [userGame, setUserGame] = useState([]);

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

  const changeKeyColour = (key, colour) => {
    const button = document.getElementById(key)
    button.classList.add(colour)
  }

  //changes css of tiles when a valid word is entered
  const flipTile = () => {

    let userGuess = board[pos.row]
    let answer = solution
    let checkSolution = answer
    let guess = []

    userGuess.forEach((tile, index) => {
      tile = document.getElementById(pos.row.toString() + index.toString())
      guess.push({ lett: tile.textContent, colour: 'grey-overlay' })

      guess.forEach((guess, index) => {
        if (guess.lett === answer[index]) {
          guess.colour = 'green-overlay'
          checkSolution = checkSolution.replace(guess.lett, '')
        }
      })

      guess.forEach(guess => {
        if (checkSolution.includes(guess.lett)) {
          guess.colour = 'yellow-overlay'
          checkSolution = checkSolution.replace(guess.lett, '')
        }
      })

      if (userGuess.join('') === solution) {
        setTimeout(() => {
          tile.classList.add('green-overlay')
          tile.classList.add('bounce')
        }, 500 / index)
      }
      setTimeout(() => {
        tile.classList.add('flip')
        tile.classList.add(guess[index].colour)
      }, 500 * index)

      setTimeout(() => {
        changeKeyColour(guess[index].lett, guess[index].colour)
      }, 2500)

    })
  };

  //grabs user game id. This is the record with wins and turns taken
  const getUserGame = (user, gid) => {
    if (user[0] && gid) {
      axios(`http://localhost:5001/user_game/${user[0].user_id}/${gid}`)
        .then(res => { setUserGame(res.data.rows) })
    }
  }

  //creates an entry in the user_game table and in the guesses table
  const makeUserGame = (user, gid, guess) => {
    let date = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit", })
    if (user[0] && gid && guess) {
      axios.put(`http://localhost:5001/new_user_game/${user[0].user_id}/${gid}/${guess}/${date}`)
        .then(res => { setUserGame(res.data.rows) })
        .catch(error => { console.log("NEW USERGAME ERROR", error) })
    }
  }

  //special case where solved date is added to the same at the same time it is created
  const winOneTurn = (user, gid, guess) => {
    if (user[0] && gid && guess) {
      axios.put(`http://localhost:5001/win_one_turn/${user[0].user_id}/${gid}/${guess}`)
        .then(res => { setUserGame(res.data.rows) })
    }
  }

  //save guess into guesses table if user exists
  const saveGuess = (guess) => {
    let date = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit", })
    if (userGame[0]) { axios.put(`http://localhost:5001/guesses/${userGame[0].id}/${guess}/${date}`) }
  };

  //enter date won into the table
  const saveWin = (turns) => {
    axios.put(`http://localhost:5001/win_user_game/${turns}/${userGame[0].id}`)
  };

  useEffect(() => {
    getUserGame(user, gameId);
  }, [pos])

  //cases for when each key is pressed. Enter, delete and backspace
  const handleKeypress = (key) => {
    const copyBoard = [...board];

    //on delete, remove one solumn unless you are at the first column
    const handleDelete = () => {
      if (pos.col > 0) {
        setPos({ ...pos, col: pos.col - 1 })
        copyBoard[pos.row][pos.col - 1] = " "
        setBoard(copyBoard)
      } else {
        setMessage("Can't go back any further")
        setTimeout(() => { setMessage("") }, 2000)
      }
    }

    //on enter, check word validity and save to the database
    const handleEnter = () => {

      //if the word contains five letters
      if (pos.col === 5) {
        let userGuess = board[pos.row].join('')

        //if the word is in the word database
        if (checkWord(userGuess)) {
          flipTile()

          //if the user has not already completed the game
          if (!completedGames.includes(gameId)) {

            //if the game is not a completed game
            if (userGame.length === 0) {

              setPos({ ...pos, row: pos.row + 1, col: 0 })

              if (solution === userGuess) { //correct on first guess
                winOneTurn(user, gameId, userGuess)

              } else { //not one turn win, make a table entry
                makeUserGame(user, gameId, userGuess)
                getUserGame(user, gameId)
                saveGuess(userGuess)

              }

            } else { //continuing a game
              if (solution === userGuess) {

                saveGuess(userGuess)
                saveWin(pos.row + 1)

              } else { // 2nd+ round and guess is incorrect

                setPos({ ...pos, row: pos.row + 1, col: 0 })

                if (pos.row < 6) {

                  saveGuess(userGuess)
                  setMessage(userGuess + " is incorrect!")
                  setTimeout(() => { setMessage("") }, 2000)

                } else {

                  // setMessage("Game over")
                  // setTimeout(() => { setMessage("") }, 5000)

                }
              }
            }
          } else { //game has been completed before
            setMessage("You have completed this game already")
            setTimeout(() => { setMessage("") }, 2000)
          }
        } else {//not a valid word
          setMessage("Not a word in our dictionary")
          setTimeout(() => { setMessage("") }, 2000)
        }
      } else { //reject the enter button
        setMessage("Need a 5 letter word")
        setTimeout(() => { setMessage("") }, 2000)
      }
    }

    //user clicks a letter
    const addLetter = (letter) => {
      if (pos.row > 5) {
        // setMessage("Game over 2")
        // setTimeout(() => { setMessage("") }, 5000)
      } else if (pos.col < 5) {
        copyBoard[pos.row][pos.col] = letter
        setBoard(copyBoard)
        setPos({ ...pos, col: pos.col + 1 })
      } else {
        setMessage('No space to enter letter ' + letter)
        setTimeout(() => { setMessage("") }, 2000)
      }
    }


    //handlers start here for key, backspace and enter
    if (key === "⌫") {

      handleDelete();
    } else if (key === "ENTER") {
      handleEnter();
    } else {
      addLetter(key);
    }

  }

  return (
    <div className="tile-keyboard" >
        <div className="message">
          {message}
          <p>&nbsp;</p>
        </div>
          <div className="tile-container">
            {guessRows}
          </div>

        <Keyboard onKeypress={handleKeypress} />

    </div >
  );

}
export default GuessContainer;