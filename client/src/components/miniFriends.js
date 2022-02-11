import React, { Fragment, useState } from "react";
import './miniFriends.css'


const MiniFriends = () => {



  return (

    <div className="left-sidebar">

      <div className="friends-list">
        icon, id, stats
      </div>

      <div className="add-a-friend" >
        Enter an id:
        <button> Add friend </button>
      </div>

    </div>

  );

}
export default MiniFriends;