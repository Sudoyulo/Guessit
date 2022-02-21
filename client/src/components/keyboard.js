import React, { useState } from "react";
import './keyboard.css'

const Keyboard = (props) => {

  const [keys, setKeys] = useState([
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L"
    , "ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"
  ])

  const allKeys = keys.map((key) => {
   
    return (
      <button id={key} key={key} className={"key-" + key} onClick={
        () => props.onKeypress(key)} > {key} </ button >
    );
  })


  return (

    <div className="key-container">
      {allKeys}
    </div>

  );

}
export default Keyboard;