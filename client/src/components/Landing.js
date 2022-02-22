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
        <div className="b">G</div>
        <div className="o">u</div>
        <div className="u">e</div>
        <div className="n">s</div>
        <div className="c">s</div>
        <div className="e">i</div>
        <div className="r">t</div>
        {/* <div className="d">D</div> */}
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
