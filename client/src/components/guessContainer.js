import React, { Fragment, useState } from "react";
import './guessContainer.css'


const GuessContainer = () => {


  const blankRows = [
    ["a", "b", "c", "d", "e"],
    ["a", " ", " ", " ", "e"],
    ["a", " ", " ", " ", "e"],
    ["a", " ", " ", " ", "e"],
    ["a", " ", " ", " ", "e"],
    ["a", " ", " ", " ", "e"]
  ]

  const guessRows = blankRows.map((row, rowIndex) => {
    return (
      <div key={row} className={"row row-" + rowIndex}> {
        row.map((col, colIndex) => {
          return (
            <div key={col} className={"col col-" + colIndex}> {col}</div>
          )
        })

      }</div>
    );
  })


  return (

    <div className="tile-container">
      {guessRows}
    </div>


  );

}
export default GuessContainer;