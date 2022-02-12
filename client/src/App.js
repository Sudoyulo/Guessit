import React, { Fragment, useState } from 'react';
import './App.css';

import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';

import MiniFriends from './components/miniFriends';

import GameTitle from './components/gameTitle';
import GuessContainer from './components/guessContainer';

import Stats from './components/stats';
import Blank from './components/blank';

function App() {

  const [showStats, setShowStats] = useState(false);

  const [rightSidebar, setRightSidebar] = useState(<Stats />)

  return (
    <Fragment>

      <div className='left-sidebar' >
        <MiniFriends />
      </div>
      <div className='main-view' >
        {/* <GameTitle showStats={showStats} setShowStats={setShowStats} /> */}
        <GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} />
        <GuessContainer />
      </div>
      <div className='right-sidebar'>
        {/* {showStats ? <Stats /> : <Blank />} */}
        {rightSidebar}
      </div>

    </Fragment>
  );
}

export default App;
