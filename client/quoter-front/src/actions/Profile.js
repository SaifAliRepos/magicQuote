import { useDispatch } from 'react-redux'
import api from '../utils/api'
import { SET_AlERT } from '../reducers/alertSlice'
import itn from '../constants/contants.json'

export const getUsers = async () => {
  const dispatch = useDispatch()
  try {
    const res = await api.get('/users/all')
    if (!res) {
      dispatch(SET_AlERT({ msg: itn.NO_USERS }))
    }
    return res.data
  } catch (err) {
    dispatch(SET_AlERT({ msg: err }))
  }
}
