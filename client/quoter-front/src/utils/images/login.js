import React from 'react'
import { Image } from 'react-bootstrap'

function LoginImage() {
  return (
    <div>
      <span className='display-3 text-main'>Quote it.</span>
      <br />
      <span className='fw-lighter offset-2'>Putting your thoughts in reality</span>
      <Image
        width={'620px'}
        className='rounded mx-2'
        src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/33f25f37736341.574b0a9bcd260.gif'
        alt='Writing gif'
      />
    </div>
  )
}

export default LoginImage
