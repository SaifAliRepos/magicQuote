import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const users = useSelector(state => state.user.users)
  const currentUser = users[0]
  const filteredUsers = users.filter(user =>
    user.connections.some(connection => currentUser.connections.includes(connection))
  )

  return (
    <Container className='mt-3'>
      <Row>
        <Col md={3}>
          <Image
            src='https://via.placeholder.com/150'
            alt='Profile'
            className='img-fluid rounded-circle'
          />
        </Col>
        <Col className='mt-4' md={9}>
          <h3>
            {currentUser.firstName} {currentUser.lastName}
          </h3>
          <p>Total connections: {currentUser.connections.length}</p>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <h2 className='my-3'>Your Connections</h2>
          <ul className='list-unstyled'>
            {filteredUsers.map(user => (
              <li key={user.id} className='mb-3'>
                <img
                  src='https://via.placeholder.com/50'
                  alt='User'
                  className='img-fluid rounded-circle mx-2'
                />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfile
