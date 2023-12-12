/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AlERT } from '../reducers/alertSlice'

function MyModal(props) {
  const [verificationCode, setVerificationCode] = useState('')
  const dispatch = useDispatch()

  const code = useSelector(state => state.auth.verificationCode)

  const onChange = e => {
    setVerificationCode(e.target.value)
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (code == verificationCode) {
      dispatch(SET_AlERT({ msg: 'User verified' }))
      props.handleModalClose()
    } else {
      dispatch(SET_AlERT({ msg: 'Invalid code, try again' }))
    }
  }
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control
              size='lg'
              type='text'
              placeholder='Verification code'
              name='verif-code'
              value={verificationCode}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>
          <Button type='submit' size='md' variant='success' value='Login'>
            Verify
          </Button>
          <hr />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default MyModal
