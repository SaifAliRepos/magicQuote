import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Connect from '../../icons/icons'
import { useAuth } from '../../hooks/useAuth'

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
      <Col md={8} className=''></Col>
      <Col
        md={4}
        className='d-flex align-items-center justify-content-center bg-light'
        style={{ height: '100vh' }}
      >
        <div className='text-center'>
          <Form onSubmit={e => onSubmit(e)}>
            <Connect />
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
            </Form.Group>
            <Button type='submit' size='md' variant='success' value='Login'>
              Login
            </Button>
            <hr />
            <Button
              onClick={() => navigate('/register')}
              size='md'
              variant='warning'
              className='text-center'
            >
              Register
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default BasicLoginForm
