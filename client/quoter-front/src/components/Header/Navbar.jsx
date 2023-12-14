import Button from 'react-bootstrap/Button'
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

  const activeUser = useSelector(state => state.auth?.user?.[0])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const navbarStyle = location.pathname === '/' ? 'px-5 bg-white' : 'px-5 mt-2 bg-white'
  const login = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className={login ? 'd-none' : 'mt-2'}>
      <Navbar expand='lg' className={navbarStyle}>
        <Navbar.Brand onClick={() => navigate('/')}>
          <span className='my-4 mx-1 h4 blue'>Quote i t </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse className={isMediumScreen ? 'text-left' : 'text-center'} id='navbarScroll'>
          <Nav className='me-auto my-5 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll></Nav>
          <Nav.Link className='px-3' onClick={() => navigate('/my-network')}>
            <MyNetwork />
            <br />
            <span className='gray-text'>Network</span>
          </Nav.Link>
          <Nav.Link className='px-3' onClick={() => navigate('/quotes')}>
            <Posts />
            <br />
            <span className='gray-text'>Posts</span>
          </Nav.Link>
          <Nav.Link className='px-3' onClick={() => navigate('/profiles')}>
            <Community />
            <br />
            <span className='gray-text'>Community</span>
          </Nav.Link>
          <Nav.Link className='px-3' onClick={() => navigate(`/my-profile`)}>
            <Profile />
            <br />
            <span className='gray-text'>Edit Profile</span>
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
              href='/login'
              variant='outline-primary'
              className={'rounded-5 mx-2'}
              size='md'
              onClick={() => activeUser && dispatch(LOGOUT())}
            >
              {activeUser ? `Logout (${activeUser.user_name})` : 'Login'}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavScrollExample
