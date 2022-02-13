import React, { useEffect, useState } from "react";
import './leftSidebar.css'
import help from '../images/help.png'
import settings from '../images/settings.png'
import stats from '../images/stats.png'
import axios from "axios";

const MiniFriends = (props) => {

  const { userAvatar, userInitials, user_id } = props;

  const [allAvatars, setAllAvatars] = useState([]);
  const [user, setUser] = useState([])

  const getAvatars = () => {
    axios('http://localhost:5001/avatars')
      .then(res => {
        console.log("RES AVATAR: ", res.data)
        const list = []
        res.data.forEach((id) => {
          list.push(id.avatar_url)
        })
        setAllAvatars(list);
      })
  }

  const getUser = () => {
    axios('http://localhost:5001/users/1')
      .then(res => {
        setMyAvatar(res.data[0].avatar_url)
        setUser(res.data)
      })
  }

  const setUserAvatar = (uid, aid, avatar) => {
    axios.put('http://localhost:5001/users/' + uid + '/avatar/' + (aid + 1))
      .then(res => {
        console.log("RES AVATAR PUT: ", res.data)
        setMyAvatar(avatar);
      })
  }



  const [myAvatar, setMyAvatar] = useState(userAvatar ? userAvatar : help);
  const [initials, setInitials] = useState(userInitials ? userInitials : "");

  console.log("ava", userAvatar)
  console.log("my", myAvatar)

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    getAvatars();
  }, [myAvatar])

  //set avatar and initials

  //this is a list of all avatars source code
  //setMyAvatar(avatar)
  const selectAvatar = allAvatars.map((avatar, index) => {
    return (<button key={index} onClick={() => { setUserAvatar(user_id, index, avatar) }}><img className="avatar" alt="avatar-icon" src={avatar} /></button>)
  })

  //max three
  const changeInitials = (value) => {
    if (initials.length < 4) {
      setInitials(value.slice(0, 3).toUpperCase());
    }
  }

  //query with user avatar, initials, game completed, turns
  const followersList = [
    { user_id: 1, initials: "KEV", avatar: help, completed: true },
    { user_id: 2, initials: "LHL", avatar: settings, completed: false }
  ];

  const followers = followersList.map((user) => {
    return (
      <div className="friend-info">
        <img className="avatar" src={user.avatar} alt="img" />
        <p > {user.initials}#{user.user_id}</p>
        {user.completed ? <button className="complete">Completed in 4</button> : <button className="complete">Not yet complete</button>}
      </div>
    );
  })

  return (

    <div className="left-sidebar">

      <div className="side-title">
        Following List
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

      <div className="following-list">
        {followers}
      </div>

      <div className="add-a-friend" >
        <input className="add-input" placeholder="Enter follower id:" ></input>
        <button className="add-button"> Add friend </button>
      </div>

    </div >

  );

}
export default MiniFriends;