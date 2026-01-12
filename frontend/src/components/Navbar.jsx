import React from 'react'
import userModel from '../../../backend/model/user.model'

const Navbar = () => {
  return (
<>
<nav>
    <h1>Book Store</h1>
    <ul>
        <h2>Home</h2>
        <h2>Login</h2>
        <h2>Register</h2>
        <h2>Logout</h2>
    </ul>
</nav>
</>
  )
}

export default Navbar