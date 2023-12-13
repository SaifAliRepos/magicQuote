import api from '../utils/api'

export const getUsers = async () => {
  try {
    const res = await api.get('/users/all')
    if (!res) {
      console.log('Unable to fecth users')
    }
    return res.data
  } catch (err) {
    console.log(err)
  }
}
