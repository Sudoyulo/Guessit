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

  return (
    <Fragment>

      <div className='miniFriends' >
        <MiniFriends />
      </div>
      <div className='main-view' >
        <GameTitle showStats={showStats} setShowStats={setShowStats} />
        <GuessContainer />
      </div>
      <div className='stats'>
        {showStats ? <Stats /> : <Blank />}
        {console.log(showStats)}
      </div>

    </Fragment>
  );
}

export default App;
