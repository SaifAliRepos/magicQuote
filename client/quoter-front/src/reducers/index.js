import { combineReducers } from 'redux'
import alert from './alertSlice'
import auth from './authSlice'

export default combineReducers({
  alert,
  auth
})
