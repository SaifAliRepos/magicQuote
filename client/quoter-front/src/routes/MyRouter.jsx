import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavScrollExample from '../components/Header/Navbar'
import AutohideToast from '../utils/Toast'
import BasicLoginForm from '../components/Users/Forms/Login'
import RegisterForm from '../components/Users/Forms/Register'
import UserList from '../components/Users/Network'
import Quotes from '../components/Quotes/Quotes'
import { PrivateRoutes } from './PrivateRoutes'

function MyRouter() {
  return (
    <Router>
      <NavScrollExample />
      <AutohideToast />
      <Routes>
        <Route path='/' element={<PrivateRoutes Component={Quotes} />} />
        <Route path='/my-profile' element={<PrivateRoutes Component={RegisterForm} />} />
        <Route path='/my-network' element={<PrivateRoutes Component={UserList} />} />
        <Route path='/login' element={<BasicLoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default MyRouter
