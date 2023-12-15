import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import LoginImage from '../../../utils/images/login'
import itn from '../../../constants/contants.json'

const BasicLoginForm = () => {
  let navigate = useNavigate()
  const { login, auth } = useAuth()

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = loginFormData

  const onChange = e =>
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    })

  const onSubmit = async e => {
    e.preventDefault()
    const loggedIn = await login(email, password)
    if (loggedIn) {
      auth()
      navigate('/')
    }
  }

  return (
    <Row className='justify-content-center'>
      <Col md={6} className='p-5'>
        <LoginImage />
        <p className='offset-5 pt-3'>
          <span className='text-second'>Register Now </span>and start posting...
        </p>
      </Col>
      <Col md={6} style={{ height: '100vh' }}>
        <div className='login-wrapper'>
          <div className='login-container'>
            <div className='login'>
              <h1>Login</h1>
              <Form onSubmit={e => onSubmit(e)}>
                <div className='input-box'>
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
                    <i className='fa fa-envelope'></i>
                  </Form.Group>
                </div>

                <div className='input-box'>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Control
                      size='lg'
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                    <i className='fa fa-lock'></i>
                  </Form.Group>
                </div>

                <Button type='submit'>{itn.LOGIN}</Button>

                <div className='links'>
                  <a>Verify Account</a>
                  <a onClick={() => navigate('/register')}>You dont have an account</a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default BasicLoginForm
