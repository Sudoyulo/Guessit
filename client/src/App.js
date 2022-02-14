import React, { Fragment, useState } from 'react';
import './App.css';

import GameTitle from './components/gameTitle';
import Blank from './components/blank';

function App() {

  const [leftSidebar, setLeftSidebar] = useState(<Blank />)
  const [rightSidebar, setRightSidebar] = useState(<Blank />)

  return (
    <Fragment>

      <div className='left-sidebar' >
        {leftSidebar}
      </div>
      <div className='main-view' >
        <GameTitle rightSidebar={rightSidebar} setRightSidebar={setRightSidebar} leftSidebar={leftSidebar} setLeftSidebar={setLeftSidebar} />

      </div>
      <div className='right-sidebar'>
        {rightSidebar}
      </div>

    </Fragment>
  );
}

export default App;
