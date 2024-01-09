import ToastFade from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { REMOVE_ALERT } from '../reducers/alertSlice'

function AutohideToast() {
  let alert = useSelector(state => state.alert.value)
  let alertText = useSelector(state => state.alert.text)
  const dispatch = useDispatch()

  return (
    <ToastContainer position='top-end' className='m-2 position-fixed'>
      <ToastFade>
        <ToastFade
          onClose={() => {
            return dispatch(REMOVE_ALERT())
          }}
          show={alert}
          delay={5000}
          autohide
        >
          <ToastFade.Header className='bg-light'>
            <img
              src='https://www.citypng.com/public/uploads/preview/hd-green-notification-bell-icon-transparent-png-1163898502733of1cgqav.png'
              className='rounded me-2'
              width='25px'
              alt=''
            />
            <strong className='me-auto'>Letting you know</strong>
            <small>Have a good day :)</small>
          </ToastFade.Header>
          <ToastFade.Body>
            <li>{alertText}</li>
          </ToastFade.Body>
        </ToastFade>
      </ToastFade>
    </ToastContainer>
  )
}

export default AutohideToast
