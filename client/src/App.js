import React, { Fragment, useState } from 'react';
import './App.css';

import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';

import MiniFriends from './components/miniFriends';

import GameTitle from './components/gameTitle';
import GuessContainer from './components/guessContainer';

import Blank from './components/blank';

function App() {

  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)

  return (
    <Fragment>

      <div className='left-sidebar' >
        {/* <MiniFriends /> */}
        {leftSidebar}
      </div>
      <div className='main-view' >
        <GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} />
        <GuessContainer />
      </div>
      <div className='right-sidebar'>
        {rightSidebar}
      </div>

    </Fragment>
  );
}

export default App;
