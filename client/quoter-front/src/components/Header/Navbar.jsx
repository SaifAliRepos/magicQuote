import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Community from '../../icons/community'
import Posts from '../../icons/quotes'
import Profile from '../../icons/profile'
import { LOGOUT } from '../../reducers/authSlice'
import MyNetwork from '../../icons/network'
import { useMediaQuery } from 'react-responsive'

const NavScrollExample = () => {
  const isMediumScreen = useMediaQuery({ maxWidth: 1000 })

  const activeUser = useSelector(state => state.auth.user)
  const activeUserId = useSelector(state => state.auth.user?._id)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const navbarStyle = location.pathname === '/' ? 'px-5 mt-2 bg-white' : 'px-5 mt-2 shadow bg-white'
  const login = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className={login ? 'd-none' : ''}>
      <Navbar expand='lg' className={navbarStyle}>
        <Container>
          <Navbar.Brand onClick={() => navigate('/posts')}>
            <span className='my-4 mx-1 h4 blue'>Motivationa H u B</span>
            <Community />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse
            className={isMediumScreen ? 'text-left' : 'text-center'}
            id='navbarScroll'
          >
            <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll></Nav>
            <Nav.Link className='mright-4' onClick={() => navigate('/my-network')}>
              <MyNetwork />
              <br />
              <span className='gray-text'>Network</span>
            </Nav.Link>
            <Nav.Link className='mright-4' onClick={() => navigate('/posts')}>
              <Posts />
              <br />
              <span className='gray-text'>Posts</span>
            </Nav.Link>
            <Nav.Link className='mright-4' onClick={() => navigate('/profiles')}>
              <Community />
              <br />
              <span className='gray-text'>Community</span>
            </Nav.Link>
            <Nav.Link
              className='mright-4'
              onClick={() => navigate(`/profile/user/${activeUserId}`)}
            >
              <Profile />
              <br />
              <span className='gray-text'>My Profile</span>
            </Nav.Link>

            <div className='d-none d-lg-block mright-4'>
              <div className='vertical-rule'></div>
            </div>

            <Form className='d-flex my-2'>
              <Button
                href='/register'
                variant='outline-danger'
                className={activeUser ? 'd-none' : 'rounded-5'}
                size='md'
              >
                Register
              </Button>
              <Button
                href='/'
                variant='outline-primary'
                className={'rounded-5 mx-2'}
                size='md'
                onClick={() => activeUser && dispatch(LOGOUT())}
              >
                {activeUser ? `Logout (${activeUser.name})` : 'Login'}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavScrollExample
