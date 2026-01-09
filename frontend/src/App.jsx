import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home';
import Register from './components/Register'
import Profile from './components/Profile';


const App = () => {
 
  return (
  <>
<Router>
   <Routes>
    <Route path='/' element={<Home/>} />
 <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Register/>} />
  <Route path='/profile' element={<Profile/>} />
 </Routes>
</Router>
  </>
  )
}

export default App