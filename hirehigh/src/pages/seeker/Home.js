
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

  return (
    <div>
    <h1>Heelooo</h1>
    <h2>qqqqqq</h2>
     <button  onClick={()=>navigate("/login")}>Login</button>
     
    </div>
  )
}

export default Home
