import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

import GameTitle from './components/gameTitle';
import Blank from './components/blank';
import Landing from './components/Landing';

import axios from "axios";

function App() {

  const readCookie = () => {
    const user = Cookies.get('cookie')
    console.log("COOKIE USER: ", user)
    if (user) {
      axios(`http://localhost:5001/users/${user}`)
        .then(res => {
          setNewUser(res.data)
          setAuth(true)
        })
    }
  }


  useEffect(() => {
    readCookie()
  }, [])

  const [auth, setAuth] = useState(false)
  const [newUser, setNewUser] = useState([]);
  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)


  const addNewUser = () => {

    const generateRandomString = function() {
      return Math.random().toString(20).substring(2, 8)
    }

    axios.put(`http://localhost:5001/new_users/${generateRandomString()}`)
      .then(res => {
        Cookies.set("cookie", res.data[0].id)
        console.log("PUT RES USER: ", res.data)
        setNewUser(res.data)
        setAuth(true)
      })
      .catch(err => {
        console.log("ERRORS HERE")
        // console.log(err.message)
      })

  }


  return (
    <Fragment>

      <Router>
        <div className='left-sidebar' >
          {leftSidebar}
        </div>
        <div className='main-view' >

          <Routes>
            {!auth && (<Route path='/landing' element={<Landing addNewUser={addNewUser} />} />)}
            {auth && (<Route path='/' element={<GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} newUserData={newUser} />} />)}
            <Route path='*' element={<Navigate to={auth ? '/' : 'landing'} />} />
          </Routes>

        </div>
        <div className='right-sidebar'>
          {rightSidebar}
        </div>
      </Router>

    </Fragment>
  );
}

export default App;
