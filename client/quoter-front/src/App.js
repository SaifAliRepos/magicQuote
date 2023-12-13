import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Users/Home'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { LOGOUT } from './reducers/authSlice'
import { useAuth } from './hooks/useAuth'
import RegisterForm from './components/Users/Forms/Register'
import AutohideToast from './utils/Toast'
import NavScrollExample from './components/Header/Navbar'
import BasicLoginForm from './components/Users/Forms/Login'
import { PrivateRoutes } from './routes/PrivateRoutes'

function App() {
  const { auth } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
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
        <Route path='/' element={<PrivateRoutes Component={Home} />} />
        <Route path='/my-profile' element={<PrivateRoutes Component={RegisterForm} />} />
        <Route path='/login' element={<BasicLoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default App
