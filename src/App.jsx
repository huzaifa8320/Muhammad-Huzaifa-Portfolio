import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Login from './pages/login'
import AuthContextProvider from './context/AuthContext'

function App() {

  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/dashboard' element={<Admin />} />
        <Route path='/admin/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
