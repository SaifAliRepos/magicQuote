import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    value: false,
    text: '',
  },

  reducers: {
    SET_AlERT: (state, action) => {
      state.value = true;
      state.text = action.payload.msg;
    },
    REMOVE_ALERT: (state) => {
      state.value = false;
      state.text = '';
    },
  },
})

export const { SET_AlERT, REMOVE_ALERT } = alertSlice.actions
export default alertSlice.reducer

