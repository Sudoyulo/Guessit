import React, { Fragment, useState } from "react";
import './miniFriends.css'


const MiniFriends = () => {



  return (

    <div className="left-sidebar">

      <div className="friends-list">
        icon, id, stats
      </div>

      <div className="add-a-friend" >
        <input className="add-input" placeholder="Enter id:" ></input>
        <button className="add-button"> Add friend </button>
      </div>

    </div >

  );

}
export default MiniFriends;