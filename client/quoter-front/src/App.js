import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { LOGOUT } from './reducers/authSlice'
import { useAuth } from './hooks/useAuth'
import Register from './components/Forms/Register'
import RegisterForm from './components/Forms/Register'
import AutohideToast from './utils/Toast'
import NavScrollExample from './components/Header/Navbar'
import Login from './components/Login'

function App() {
  const { auth } = useAuth()
  const dispatch = useDispatch()

  const authenticated = useSelector(state => state.auth.user?.isAuthenticated)

  useEffect(() => {
    if (localStorage.token && authenticated) {
      setAuthToken(localStorage.token)
      auth()
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(LOGOUT())
    })
  }, [auth, dispatch])

  return (
    <Router>
      <NavScrollExample />
      <AutohideToast />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='my-dashboard/' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
