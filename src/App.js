import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Contact from './components/Contact'
import About from './components/About'
import Signup from './components/SignUp'
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="*" element= {<ErrorPage/>}/>   
        {/* (*) in the path of a Route component signifies a catch-all route.  */}
      </Routes>
    </div>
  )
}

export default App