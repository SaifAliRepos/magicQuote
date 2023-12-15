import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { LOGOUT } from './reducers/authSlice'
import { useAuth } from './hooks/useAuth'
import MyRouter from './routes/MyRouter'

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

  return <MyRouter />
}

export default App
