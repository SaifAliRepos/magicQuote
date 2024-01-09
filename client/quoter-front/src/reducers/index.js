import { combineReducers } from 'redux'
import alert from './alertSlice'
import auth from './authSlice'
import user from './userSlice'

export default combineReducers({
  alert,
  auth,
  user
})
