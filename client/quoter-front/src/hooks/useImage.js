import { useDispatch } from 'react-redux'
import { SET_AlERT } from '../reducers/alertSlice'

/* eslint-disable no-magic-numbers */
export const useImage = () => {
  const dispatch = useDispatch()
  const handleFileChange = async (event, callback) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result
      if (dataUrl) {
        const maxImgSize = 3 * 1024 * 1024
        if (dataUrl.length <= maxImgSize) {
          callback(dataUrl.toString())
        } else {
          dispatch(SET_AlERT({ msg: 'Image too large' }))
        }
      }
    }

    reader.readAsDataURL(file)
  }

  return {
    handleFileChange
  }
}
