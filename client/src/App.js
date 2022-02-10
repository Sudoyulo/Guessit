import React, { Fragment } from 'react';
import './App.css';

import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';

import GameTitle from './components/gameTitle';
import GuessContainer from './components/guessContainer';
import Keyboard from './components/keyboard';


function App() {
  return (
    <Fragment>
      <GameTitle />
      <GuessContainer />
      <Keyboard />


      <div className="container">
        <ListTodos />
        <InputTodo />
      </div>

    </Fragment>
  );
}

export default App;
