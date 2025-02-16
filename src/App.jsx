import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import Login from './pages/auth/Login'
import AuthContextProvider from './context/AuthContext'

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/:page' element={<Admin />} />
          <Route path='/admin/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
