import React from 'react'
import { useNavigate } from 'react-router-dom'
import howto2 from '../images/howto2.png'
import './Landing.css'

export default function Landing({ addNewUser }) {

  const navigate = useNavigate();
  const onClick = () => {

    addNewUser();
    navigate('/');
  }

  return (
    <div className='landing'>
      <div className="bouncing-text">
        <div className="b">m</div>
        <div className="o">i</div>
        <div className="u">n</div>
        <div className="n">i</div>
        <div className="c">W</div>
        <div className="e">O</div>
        <div className="r">R</div>
        <div className="d">D</div>
        <div className="shadow"></div>
        <div className="shadow-two"></div>
      </div>
      <div>
        <img className="howto" src={howto2} alt="How to play" />
      </div>
      <button type="button" className="btn btn-success" onClick={onClick}>PLAY NOW!</button>
    </div>
  )
}
