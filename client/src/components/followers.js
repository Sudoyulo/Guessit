import React, { useEffect, useState } from "react";
import './leftSidebar.css'
import axios from "axios";

const Followers = (props) => {

  const { userAvatar, userInitials, user_id, userinfo, gameid } = props;

  const [allAvatars, setAllAvatars] = useState([]);
  const [user, setUser] = useState(userinfo)
  const [myAvatar, setMyAvatar] = useState(userAvatar);
  const [myInitials, setInitials] = useState(userInitials);
  const [followsList, setFollowsList] = useState([]);
  const [friendInput, setFriendInput] = useState("");

  //grabs all avatar sources from the database
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

  //get singlular user from the database with id
  const getUser = () => {
    axios('http://localhost:5001/users/' + user[0].user_id)
      .then(res => {
        setMyAvatar(res.data[0].avatar_url)
        setInitials(res.data[0].initials)
        setUser(res.data)
      })
  }

  //writes to users database the avatar number
  const setUserAvatar = (uid, aid, avatar) => {
    axios.put('http://localhost:5001/users/' + uid + '/avatar/' + (aid + 1))
      .then(res => {
        // console.log("RES AVATAR PUT: ", res.data)
        setMyAvatar(avatar);
      })
  }

  //writes to users database the initials of the user
  const setUserInitials = (uid, str) => {
    axios.put('http://localhost:5001/users/' + uid + '/initials/' + str)
      .then(res => {
        // console.log("RES INIT PUT: ", res.data)
        setInitials(str);
      })
  }

  // grabs all followers of user_id. Promise sets follow list after all followers are loaded.
  const getMyFollowers = () => {
    const followerData = [];
    const followerIds = [];

    axios('http://localhost:5001/getmyfriends/' + user_id)
      .then(res => {
        res.data.rows.forEach(entry => { followerIds.push(entry.friendid) })
        const promises = [];
        followerIds.forEach(person => {
          const p = axios('http://localhost:5001/users/' + person)
            .then(res => { followerData.push(res.data) })
          promises.push(p)
        })
        Promise.all(promises)
          .then(() => { setFollowsList(followerData) })
      })
  }

  //adds friend id to your friends list
  const addFriend = (friendId) => {

    axios.put('http://localhost:5001/newfollow/' + user_id + '/' + friendId)
      .then(res => {
        console.log(res)
        setFriendInput("")
        getMyFollowers();
      })
      .catch(err => {
        console.log("ERROR MESSAGE: ", err.message)
      })
  }

  useEffect(() => {
    getUser();
    getMyFollowers();
    getAvatars();
  }, [])


  //this is a list of all avatars source code. Sets avatar when clicked
  const selectAvatar = allAvatars.map((avatar, index) => {
    return (<button key={index} onClick={() => { setUserAvatar(user[0].user_id, index, avatar) }}><img className="avatar" alt="avatar-icon" src={avatar} /></button>)
  })

  // Change initials but only to a maximum character count of 3
  const changeInitials = (value) => {
    if (myInitials.length < 4) {
      setUserInitials(user_id, value.slice(0, 3).toUpperCase());
      setInitials(value.slice(0, 3).toUpperCase())
    }
  }

  //loads a list of friends with completed in number lists
  const followers = followsList.map((friend, index) => {
    const firstFriend = friend[0];

    //vertify that is it not undefined
    if (!firstFriend) { return "" }

    let turnsWin = 0;

    friend.forEach(gamedata => {
      if (gamedata.id === gameid) { turnsWin = gamedata.turns_taken }
    })

    return (
      <div key={index} className="friend-info" >
        <img className="avatar" src={firstFriend.avatar_url} alt="friend avatar" />
        <p> {firstFriend.initials}#{firstFriend.user_id}</p>
        {turnsWin ? <button className="complete">Completed in {turnsWin}</button> : <button className="complete">Not yet complete</button>}
      </div>
    )
  })

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
        <input className="add-input" placeholder="Enter follower id:" value={friendInput} onChange={(e) => { setFriendInput(e.target.value) }} ></input> &nbsp;
        <button className="add-button" onClick={() => { addFriend(friendInput) }}> Add friend </button>
      </div>
    </div >

  );

}
export default Followers;