import React, { Fragment } from 'react';
import './App.css';

import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';

import MiniFriends from './components/miniFriends';

import GameTitle from './components/gameTitle';
import GuessContainer from './components/guessContainer';
import Keyboard from './components/keyboard';


function App() {
  return (
    <Fragment>

      <div className='miniFriends' >
        <MiniFriends />
      </div>
      <div className='main-view' >


        <GameTitle />
        <GuessContainer />
        <Keyboard />
      </div>
      <div className='right-sidebar'>

      </div>



    </Fragment>
  );
}

export default App;
