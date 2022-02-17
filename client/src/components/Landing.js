import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing({authenticate, addUser}) {
  const navigate = useNavigate();
  const onClick = () => {
    authenticate();
    addUser();
    navigate('/')
  }
  // useEffect(()=>{
  //   navigate('/')
  // }, [navigate])
  return (
    <div>
      <h3>Welcome to the game!</h3>
      <button onClick={onClick}>PLAY</button>
    </div>
  )
}
