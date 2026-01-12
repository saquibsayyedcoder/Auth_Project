import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home';
import Register from './components/Register'
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import AddBook from './Pages/AddBook';
import ProtectedRoute from './components/ProtectedRoute';
import EditBook from './Pages/EditBook';


const App = () => {
 
  return (
  <>
<Router>
  <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>} />
 <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Register/>} />
  <Route path='/profile' element={<Profile/>} />
  <Route path="/edit-book/:id" element={<EditBook />} />

  <Route
  path="/add-book"
  element={
    <ProtectedRoute>
      <AddBook />
    </ProtectedRoute>
  }/>
 </Routes>
</Router>
  </>
  )
}

export default App