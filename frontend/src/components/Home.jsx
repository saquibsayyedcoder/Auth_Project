import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
        <h1>There is two button</h1>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/signup'><button>Register</button></Link>
    </div>
  )
}

export default Home