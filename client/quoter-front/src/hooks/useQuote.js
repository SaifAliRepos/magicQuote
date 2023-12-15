import { useDispatch } from 'react-redux'
import { SET_AlERT } from '../reducers/alertSlice'
import api from '../utils/api'
import { useCallback } from 'react'

export const useQuote = () => {
  const dispatch = useDispatch()

  const createQuote = async formData => {
    try {
      await api.post('/quotes/new', formData)
      dispatch(SET_AlERT({ msg: 'Quote Created' }))
      return true
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(SET_AlERT({ msg: error.msg })))
      }
      return false
    }
  }

  const getQuote = async () => {
    try {
      const res = await api.get('/quotes/all')
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }))
      }
      return res.data
    } catch (err) {
      dispatch(SET_AlERT({ msg: err }))
    }
  }

  const updateQuote = async (formData, id) => {
    try {
      await api.put(`/quotes/edit/${id}`, formData)
      dispatch(SET_AlERT({ msg: 'Quote Updated' }))
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(SET_AlERT({ msg: error.msg })))
      }
    }
  }

  const getConnectedQuotes = async () => {
    try {
      const res = await api.get(`/quotes/connected-quotes`)
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }))
      }
      return res.data
    } catch (err) {
      dispatch(SET_AlERT({ msg: err }))
    }
  }

  const getUserQuotes = async userId => {
    try {
      const res = await api.get(`/quotes/user/${userId}/recent_activity/quotes`)
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }))
      }
      return res.data
    } catch (err) {
      dispatch(SET_AlERT({ msg: err }))
    }
  }

  const removeQuote = useCallback(async id => {
    try {
      await api.delete(`/quotes/${id}`)
      dispatch(SET_AlERT({ msg: itn.POST_DELETED }))
    } catch (err) {
      dispatch(SET_AlERT({ msg: err }))
    }
  }, [])

  const likeQuote = async quoteId => {
    try {
      await api.put(`/quotes/${quoteId}/like`)
      return true
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(SET_AlERT({ msg: error.msg })))
      }
      return false
    }
  }

  return {
    createQuote,
    getQuote,
    removeQuote,
    updateQuote,
    likeQuote,
    getConnectedQuotes,
    getUserQuotes
  }
}
