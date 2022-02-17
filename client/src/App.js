import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

import GameTitle from './components/gameTitle';
import Blank from './components/blank';
import Landing from './components/Landing';

import axios from "axios";

function App() {


  const authenticate = () => {
    setAuth(true)
    Cookies.set("user", "authTrue")
  }


  const readCookie = () => {
    const user = Cookies.get('user')
    if (user) {
      setAuth(true)
    }
  }

  useEffect(() => {
    readCookie()
  }, [])

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState([]);
  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)


  const newUser = () => {

    axios.put('http://localhost:5001/new_users/xxxxxx')
      .then(res => {
        console.log("PUT RES USER: ", res.data)
        console.log("I am user", res.data)
        setUser(res.data)

      })

  }

  // const getUser = () => {
  //   axios.get('http://localhost:5001/users/LLOYD')
  //     .then(res => {
  //       console.log("GET RES USER: ", res.data)
  //       setUser(res.data)
  //     })
  // }
  console.log("APP USER: ", user)

  return (
    <Fragment>

      <Router>
        <div className='left-sidebar' >
          {leftSidebar}
        </div>
        <div className='main-view' >

          <Routes>
            {!auth && (<Route path='/landing' element={<Landing authenticate={authenticate} addUser={newUser}/>} />)}
            {auth && (<Route path='/' element={<GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} newUserData={user}/>} />)}
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
