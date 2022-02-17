import React, { useEffect, useState } from "react";
import './leftSidebar.css'
import axios from "axios";

const Followers = (props) => {

  const { userAvatar, userInitials, user_id, userinfo } = props;

  const [allAvatars, setAllAvatars] = useState([]);
  const [user, setUser] = useState([userinfo])
  const [myAvatar, setMyAvatar] = useState(userAvatar);
  const [myInitials, setInitials] = useState(userInitials);


  const getAvatars = () => {
    axios('http://localhost:5001/avatars')
      .then(res => {
        // console.log("RES AVATAR: ", res.data)
        const list = []
        res.data.forEach((id) => {
          list.push(id.avatar_url)
        })
        setAllAvatars(list);
      })
  }

  const getUser = () => {
    axios('http://localhost:5001/users/' + user_id)
      .then(res => {
        setMyAvatar(res.data[0].avatar_url)
        setInitials(res.data[0].initials)
        setUser(res.data)
      })
  }

  const setUserAvatar = (uid, aid, avatar) => {
    axios.put('http://localhost:5001/users/' + uid + '/avatar/' + (aid + 1))
      .then(res => {
        // console.log("RES AVATAR PUT: ", res.data)
        setMyAvatar(avatar);
      })
  }

  const setUserInitials = (uid, str) => {
    axios.put('http://localhost:5001/users/' + uid + '/initials/' + str)
      .then(res => {
        // console.log("RES INIT PUT: ", res.data)
        setInitials(str);
      })
  }

  const getMyFriends = () => {
    console.log("getting my friends", user_id)
    axios('http://localhost:5001/getmyfriends/' + user_id)
      .then(res => {
        console.log("client, get my friends", res.data.rows)
      })
  }



  // called here because of reload issues
  useEffect(() => {
    getUser();
    getMyFriends();
  }, [])

  useEffect(() => {
    getAvatars();
  }, [myAvatar])

  //this is a list of all avatars source code
  //setMyAvatar(avatar)
  const selectAvatar = allAvatars.map((avatar, index) => {
    return (<button key={index} onClick={() => { setUserAvatar(user_id, index, avatar) }}><img className="avatar" alt="avatar-icon" src={avatar} /></button>)
  })

  //max three
  const changeInitials = (value) => {

    if (myInitials.length < 4) {
      setUserInitials(user_id, value.slice(0, 3).toUpperCase());
      setInitials(value.slice(0, 3).toUpperCase())
    }
  }

  //query with user avatar, initials, game completed, turns
  const followersList = [
    { user_id: 1, initials: "KEV", avatar: allAvatars[2], completed: true },
    { user_id: 2, initials: "LHL", avatar: allAvatars[8], completed: false }
  ];

  const followers = followersList.map((user) => {
    return (
      <div key={user.id} className="friend-info">
        <img className="avatar" src={user.avatar} alt="img" />
        <p > {user.initials}#{user.user_id}</p>
        {user.completed ? <button className="complete">Completed in 4</button> : <button className="complete">Not yet complete</button>}
      </div>
    );
  })
  //{ changeInitials(e.target.value) 
  return (

    <div className="left-sidebar">

      <div className="side-title">
        Social
      </div>

      <div className="user-data">
        <p><img className="avatar" src={myAvatar} alt="Avatar" />  </p>
        <p>{myInitials} </p>
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
          <input className="initials-box" placeholder="LHL" value={myInitials} onChange={(e) => { changeInitials(e.target.value) }}></input>
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
export default Followers;