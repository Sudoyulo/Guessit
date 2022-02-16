import React, { useState } from "react";
import './keyboard.css'

const Keyboard = (props) => {

  const { keys, setKeys } = props;

  const allKeys = keys.map((key) => {
    let color = "gray";
    return (
      <button id={key} key={key} className={"key-" + key} onClick={
        () => props.onKeypress(key)} style={{ backgroundColor: color }} > {key} </ button >
    );
  })


  return (

    <div className="key-container">
      {allKeys}
    </div>

  );

}
export default Keyboard;