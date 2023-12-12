import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: null,
    verificationCode: '',
    loading: true,
    user: null
  },

  reducers: {
    REGISTER_USER: (state, action) => {
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        verificationCode: action.payload.verificationCode,
        isAuthenticated: false,
        user: null
      }
    },
    USER_LOADED: (state, action) => {
      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: false,
        user: action.payload.user //changed it to [0]
      }
    },
    LOGOUT: state => {
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      }
    }
  }
})

export const { REGISTER_USER, LOGOUT, USER_LOADED } = authSlice.actions
export default authSlice.reducer
