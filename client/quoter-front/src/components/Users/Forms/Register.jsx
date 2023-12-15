/* eslint-disable no-magic-numbers */
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { SET_AlERT } from '../../../reducers/alertSlice'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../../../hooks/useAuth'
import MyModal from '../VerifyUser'
import LoginImage from '../../../utils/images/login'
import MyProfile from '../MyProfile'
import itn from '../../../constants/contants.json'

const RegisterForm = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 600 })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, update, auth } = useAuth()

  const [modalShow, setModalShow] = React.useState(false)
  const [profile, setProfile] = useState('')
  const activeUser = useSelector(state => state.auth?.user?.[0])
  const location = useLocation()
  const myProfilePath = location.pathname === '/my-profile'

  const [registerFormData, setFormData] = useState({
    user_name: activeUser?.user_name || '',
    first_name: activeUser?.first_name || '',
    last_name: activeUser?.last_name || '',
    email: activeUser?.email || '',
    password: '',
    confirmPassword: ''
  })

  const { user_name, first_name, last_name, email, password, confirmPassword } = registerFormData

  const onChange = e =>
    setFormData({
      ...registerFormData,
      [e.target.name]: e.target.value
    })

  const handleClose = () => setModalShow(false)

  const handleFileChange = async event => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      if (dataUrl) {
        const maxImgSize = 3 * 1024 * 1024
        if (dataUrl.length <= maxImgSize) {
          setProfile(dataUrl.toString())
        }
      }
    }
    reader.readAsDataURL(file)
  }
  const updateProfile = async () => {
    const success = await update({ first_name, last_name, user_name, profile, password })
    if (success) {
      dispatch(SET_AlERT({ msg: 'User updated successfully' }))
      auth()
    }
  }

  const registerUser = async () => {
    if (password !== confirmPassword) {
      dispatch(SET_AlERT({ msg: 'Password mismatch' }))
    } else {
      const success = await register({
        first_name,
        last_name,
        user_name,
        profile,
        email,
        password
      })
      if (success) {
        dispatch(SET_AlERT({ msg: 'User registered successfully' }))
        setModalShow(true)
      }
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    const submitterText = e.nativeEvent.submitter.textContent
    if (submitterText === 'Update') {
      await updateProfile()
    } else if (submitterText === 'Register') {
      await registerUser()
    }
  }

  return (
    <div>
      <Row>
        <Col className='p-5'>{!myProfilePath ? <LoginImage /> : <MyProfile />}</Col>
        <Col md={6} className={`p-5 text-center ${activeUser ? '' : 'bg-light'}`}>
          <p className='text-main'>{!myProfilePath && 'Register Yourself'}</p>
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
                disabled={myProfilePath ? true : false}
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
            <Form.Group className='mb-4' controlId='formImg'>
              <Form.Control
                size='sm'
                type='file'
                name='image'
                accept='images/*'
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button
              type='submit'
              size='lg'
              variant={isSmallScreen ? 'outline-success px-5' : 'outline-success x-large-btn'}
              value='Register'
            >
              {myProfilePath ? 'Update' : 'Register'}
            </Button>
            <hr />
            {!myProfilePath && (
              <p>
                Already have an account?
                <Button variant='link' onClick={() => navigate('/login')}>
                  {itn.SIGN_IN}
                </Button>
              </p>
            )}
          </Form>
        </Col>
        <MyModal show={modalShow} onHide={handleClose} />
      </Row>
    </div>
  )
}

export default RegisterForm
