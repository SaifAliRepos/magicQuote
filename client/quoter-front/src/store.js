import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertSlice'
import authReducer from './reducers/authSlice'
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    user: userReducer
  }
})
