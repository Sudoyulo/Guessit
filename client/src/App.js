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
  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)

  return (
    <Fragment>

      <Router>
        <div className='left-sidebar' >
          {leftSidebar}
        </div>
        <div className='main-view' >

          <Routes>
            {!auth && (<Route path='/landing' element={<Landing authenticate={authenticate} />} />)}
            {auth && (<Route path='/' element={<GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} />} />)}
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
