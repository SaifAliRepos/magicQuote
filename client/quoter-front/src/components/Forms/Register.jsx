import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { SET_AlERT } from '../../reducers/alertSlice'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../hooks/useAuth'
import MyModal from '../VerifyUser'

const RegisterForm = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 600 })

  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const { register } = useAuth()

  const [modalShow, setModalShow] = React.useState(false)

  const [registerFormData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { user_name, first_name, last_name, email, password, confirmPassword } = registerFormData

  const onChange = e =>
    setFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    })

  const handleModalClose = () => {
    setModalShow(false)
  }
  const onSubmit = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      dispatch(SET_AlERT({ msg: 'Password mismatch' }))
    } else {
      const success = await register({ first_name, last_name, user_name, email, password })
      if (success) {
        dispatch(SET_AlERT({ msg: 'User registered succesfully' }))
        setModalShow(true)
      }
    }
  }

  return (
    <div>
      <Row>
        <Col className=''></Col>
        <Col md={5} className='p-5 text-center bg-light' style={{ height: '100vh' }}>
          <Form className='' onSubmit={e => onSubmit(e)}>
            <Form.Group className='mb-4' controlId='formFirstName'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Enter first name'
                name='first_name'
                value={first_name}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formLastName'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Enter last name'
                name='last_name'
                value={last_name}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formName'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Enter user name'
                name='user_name'
                value={user_name}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formBasicEmail'>
              <Form.Control
                size='lg'
                type='email'
                placeholder='Enter email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Control
                size='lg'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formConfirmPassword'>
              <Form.Control
                size='lg'
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={e => onChange(e)}
                required
              />
            </Form.Group>

            <Button
              type='submit'
              size='lg'
              variant={isSmallScreen ? 'outline-success px-5' : 'outline-success x-large-btn'}
              value='Register'
            >
              Register
            </Button>
            <hr />
            <p>
              Already have an account?
              <Button variant='link' onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </p>
          </Form>
        </Col>
        <MyModal
          handleModalClose={handleModalClose}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Row>
    </div>
  )
}

export default RegisterForm
