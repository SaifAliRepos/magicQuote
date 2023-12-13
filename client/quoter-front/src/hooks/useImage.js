/* eslint-disable no-magic-numbers */
export const useImage = () => {
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
          console.error('The selected file is too large.')
        }
      }
    }

    reader.readAsDataURL(file)
  }

  return {
    handleFileChange
  }
}
