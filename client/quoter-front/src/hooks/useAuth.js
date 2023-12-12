import { useDispatch } from 'react-redux'
import api from '../utils/api'
import setAuthToken from '../utils/setAuthToken'
import { LOGOUT, REGISTER_USER, USER_LOADED } from '../reducers/authSlice'
import { SET_AlERT } from '../reducers/alertSlice'
const itn = require('../constants/contants.json')

export const useAuth = () => {
  const dispatch = useDispatch()

  const register = async formData => {
    try {
      const res = await api.post('/users/register', formData)
      dispatch(
        REGISTER_USER({ token: res.data.token, verificationCode: res.data.verificationCode })
      )
      return true
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(SET_AlERT({ msg: error.msg })))
      }
      return false
    }
  }

  const login = async (email, password) => {
    try {
      const body = { email, password }
      await api.post('/users/login', body)
      dispatch(USER_LOADED({ isAuthenticated: true }))
      dispatch(SET_AlERT({ msg: itn.SIGNIN }))
      return true
    } catch (err) {
      const errors = err.response.data.errors

      if (errors) {
        errors.forEach(error => dispatch(SET_AlERT({ msg: error.msg })))
      }

      dispatch(LOGOUT())
      return false
    }
  }

  const auth = async () => {
    try {
      setAuthToken(localStorage.getItem('token'))
      const res = await api.get('/users/auth')
      dispatch(USER_LOADED(res.data))
      return true
    } catch (err) {
      dispatch(LOGOUT())
      return false
    }
  }

  return {
    register,
    login,
    auth
  }
}
