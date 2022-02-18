import React from "react";
import './replayContainer.css'


const ReplayContainer = (props) => {

  const {board, solution, timestamp, guessList, flipTiles} = props
  console.log("guessList: ", guessList)
  console.log("Im in the replay", props.timestamp, props.guessList) //and solution
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
      {/* <div className="col"> 1</div>
      <div className="col"> 2</div>
      <div className="col"> 3</div>
      <div className="col"> 4</div>
      <div className="col"> 5</div>
      <div className="col"> 6</div> */}
      {/* {guessRows} */}
    </div >
  );

}
export default ReplayContainer;