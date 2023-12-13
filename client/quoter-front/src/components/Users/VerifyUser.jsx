/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AlERT } from '../../reducers/alertSlice'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function MyModal(props) {
  const [verificationCode, setVerificationCode] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const code = useSelector(state => state.auth.verificationCode)
  const { verifyUser } = useAuth()
  const onChange = e => {
    setVerificationCode(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (code == verificationCode) {
      const res = await verifyUser()
      if (res) {
        dispatch(SET_AlERT({ msg: 'User verified' }))
        navigate('/')
      }
    } else {
      dispatch(SET_AlERT({ msg: 'Invalid code, try again' }))
    }
  }
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title className='me-auto' id='contained-modal-title-vcenter'>
          Verify Your Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group className='mb-3 px-5' controlId='formBasicPassword'>
            <Form.Control
              size='lg'
              type='text'
              placeholder='Verification code'
              name='verificationCode' // Set the name to 'verificationCode'
              value={verificationCode}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>
          <Button type='submit' size='md' variant='success' value='Login'>
            Verify
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default MyModal
