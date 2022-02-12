import React, { Fragment, useState } from "react";
import './leftSidebar.css'
import help from '../images/help.png'
import settings from '../images/settings.png'
import stats from '../images/stats.png'

const MiniFriends = () => {

  const [myAvatar, setMyAvatar] = useState(help);
  const [initials, setInitials] = useState("")

  //this is a list of all avatars source code
  const avatarList = [help, settings, stats]


  //I know there is white sticking out. Hopefully avatar list is divisible by 5
  const selectAvatar = avatarList.map((avatar) => {
    return (<button key={avatar} onClick={() => { setMyAvatar(avatar) }}><img className="avatar" alt="avatar-icon" src={avatar} /></button>)
  })

  //max three
  const changeInitials = (value) => {
    if (initials.length < 4) {
      setInitials(value.slice(0, 3).toUpperCase());
    }
  }

  return (

    <div className="left-sidebar">

      <div className="friends-list">
        icon, id, stats
      </div>


      <div className="user-data">
        <p><img className="avatar" src={myAvatar} alt="Avatar" />  </p>
        <p>{initials} </p>
      </div>
      <div className="avatar-initials">
        <div className="avatar-container">
          Choose an avatar:
          <div className="avatar-list">
            {selectAvatar}
          </div>
        </div>
        <br />
        <div className="initial-container" >
          Set Initials: &nbsp;
          <input className="initials-box" placeholder="LHL" value={initials} onChange={(e) => { changeInitials(e.target.value) }}></input>
        </div>
      </div>



      <div className="add-a-friend" >
        <input className="add-input" placeholder="Enter id:" ></input>
        <button className="add-button"> Add friend </button>
      </div>

    </div >

  );

}
export default MiniFriends;