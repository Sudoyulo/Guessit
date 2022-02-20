import React from 'react'
import { useNavigate } from 'react-router-dom'
import howto2 from '../images/howto2.png'
import './Landing.css'


export default function Landing({addNewUser}) {


  const navigate = useNavigate();
  const onClick = () => {
  
    addNewUser();
    navigate('/');
  }
  // useEffect(()=>{
  //   navigate('/')
  // }, [navigate])
  return (
    <div className='landing'>
      <div class="bouncing-text">
        <div class="b">m</div>
        <div class="o">i</div>
        <div class="u">n</div>
        <div class="n">i</div>
        <div class="c">W</div>
        <div class="e">O</div>
        <div class="r">R</div>
        <div class="d">D</div>
        <div class="shadow"></div>
        <div class="shadow-two"></div>
      </div>
      <div>
        <img className="howto" src={howto2} alt="How to play" />
      </div>
      <button type="button" className="btn btn-success" onClick={onClick}>PLAY NOW!</button>
    </div>
  )
}
