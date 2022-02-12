import React, { Fragment, useState } from "react";
import './keyboard.css'

const Keyboard = (props) => {

  const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L"
    , "ENTER", "Z", "X", "C", "V", "B", "N", "M", "<<"
  ]

  const allKeys = keys.map((key) => {
    return (
      <button key={key} className={"key-" + key} onClick={
        () => { console.log(key + " clicked") }} > {key} </ button >
    );
  })


  return (

    <div className="key-container">
      {allKeys}
    </div>


  );

}
export default Keyboard;