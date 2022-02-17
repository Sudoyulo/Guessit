import React, { useState, useEffect } from "react";
import axios from "axios";
import './rightSidebar.css';
// import './keyboard.css';
import './guessContainer.css';
import { getRandomWord } from "../words/wordList";

const Settings = (props) => {

  const [gameAmount, setGameAmount] = useState([]);
  const [search, setSearch] = useState(1);
  const { user, getGame, resetBoard, loadBoard, completedGames, hangingGames } = props;

  const resetKeyboard = () => {
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']

    keys.forEach(key => {
      const colours = ['green-overlay', 'yellow-overlay', 'grey-overlay']
      colours.forEach(colour => {
        document.getElementById(key).classList.remove(colour)
      })
    })
  }

  const getGames = () => {
    axios('http://localhost:5001/games')
      .then(res => {
        let list = []
        res.data.forEach((id) => {
          list.push(id.id)
        })
        setGameAmount(list);

      })
  }

  const makeGame = (word) => {
    axios.put('http://localhost:5001/games/' + word)
      .then(res => {
        console.log("inserted new game", res)
        getGames();
      })
  }

  const loadOrReset = () => {
    console.log("load or reset game:", user[0].user_id, search)


    if (completedGames.includes(search)) {
      console.log("completed game")
      getGuesses();
      loadBoard();
    } else if (hangingGames.includes(search)) {
      getGuesses();
      console.log("hanging game")
      loadBoard();
    } else {
      console.log("new game")
      resetBoard();
    }

  }

  // const getUserGame = (user, gid) => {
  //   // console.log("getting game", user, gid) //causses memory leak

  //   if (user[0] && gid) {
  //     // console.log("fetching", user[0].user_id, gameId)
  //     axios('http://localhost:5001/user_game/' + user[0].user_id + "/" + gid)
  //       .then(res => {
  //         // console.log("usergame", res.data.rows)
  //         setUserGame(res.data.rows)
  //       })
  //   }

  // }


  const getGuesses = () => {
    console.log("trying to load guesses", user[0].user_id, search)

    if (user[0] && search) {
      // console.log("fetching", user[0].user_id, gameId)
      axios('http://localhost:5001/user_game/' + user[0].user_id + "/" + search)
        .then(res => {
          // console.log("usergame", res.data.rows[0])

          axios('http://localhost:5001/guesslog/' + res.data.rows[0].id)
            .then(res => {
              console.log("loaded guesses", res.data.rows)
            })


        })
    }
  }


  useEffect(() => {
    // readCompletedgames(user);
    getGames();
  }, [resetBoard])

  const gameLinks = gameAmount.map((gameid) => {
    let icon = "🛑 New";

    if (completedGames.includes(gameid)) {
      icon = "✅ Done";
    } else if (hangingGames.includes(gameid)) {
      icon = "⚠️ Tried";
    }

    return (
      <option key={gameid} value={gameid}> {gameid} {icon} </option>
    )
  })

  return (

    <div className="right-sidebar">
      <p className="stat-title">Settings </p>
      <div className="setting-container">
        Load a game
        <select value={search} onChange={(e) => { setSearch(Number(e.target.value)) }}>
          {gameLinks}
        </select>
        <button onClick={() => { getGame(search); loadOrReset(); resetKeyboard(); }}>Load</button>
      </div>
      <div className="setting-container">
        Create a game
        <button onClick={() => makeGame(getRandomWord())}>Create!</button>
      </div>


    </div >
  );

}
export default Settings;