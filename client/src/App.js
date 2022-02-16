import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

import GameTitle from './components/gameTitle';
import Blank from './components/blank';
import Landing from './components/Landing';

import axios from "axios";

function App() {

  const Paths = () => {
    const authenticate = () => {
      setAuth(true)
      Cookies.set("user", "authTrue")
    }
    return (
      <Routes>
        {!auth && (<Route path='/landing' element={<Landing authenticate={authenticate} />} />)}
        {auth && (<Route path='/' element={<GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} />} />)}
        <Route path='*' element={<Navigate to={auth ? '/' : 'landing'} />} />
      </Routes>
    )
  }

  const readCookie = () => {
    const user = Cookies.get('user')
    if (user) {
      setAuth(true)
    }
  }

  const [userId, setUserId] = useState(0);
  let refresh = false;

  const newUser = () => {

    if (refresh) {

      axios.put('http://localhost:5001/new_users/kevin')
        .then(res => {
          // console.log("RES USER: ", res.data)
          console.log("I am user", res.data[0].id)
          setUserId(res.data[0].id)
          refresh = false;
        })
    }
  }

  useEffect(() => {
    newUser()
    console.log(userId)
  }, [])

  useEffect(() => {
    readCookie()
  }, [])

  const [auth, setAuth] = useState(false)
  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)

  return (
    <Fragment>

      <Router>
        <div className='left-sidebar' >
          {leftSidebar}
        </div>
        <div className='main-view' >
          <button onClick={() => { newUser(); refresh = true; }}>new</button>
          <GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} userId={userId} />
        </div>
        <div className='right-sidebar'>
          {rightSidebar}
        </div>
      </Router>

    </Fragment>
  );
}

export default App;
