/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followRequest, getUsers, unfollowRequest } from '../../reducers/userSlice'
import { Badge, Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { List } from 'react-virtualized'
import Facebook from '../../icons/facebook'
import Instagram from '../../icons/instagram'
import Linkedin from '../../icons/linkedin'
import PropTypes from 'prop-types'

const UserList = () => {
  const dispatch = useDispatch()
  const [viewUser, setViewUser] = useState({})
  const users = useSelector(state => state.user.users)
  const currentUser = users[0]
  const isAdmin = currentUser.role === 'admin'

  const handleFollow = (userId, followedUserId) => {
    dispatch(followRequest({ userId, followedUserId }))
    dispatch(getUsers())
  }

  const handleUnfollow = (userId, unfollowedUserId) => {
    dispatch(unfollowRequest({ userId, unfollowedUserId }))
    dispatch(getUsers())
  }

  const handleViewUser = user => {
    setViewUser(user)
  }

  const rowRenderer = useMemo(() => {
    return ({ index, key, style }) => (
      <div key={key} style={style}>
        <Card className='mb-4'>
          <Card.Body>
            <Image
              src={users[index].gender === 'Female' ? '/assets/female.png' : '/assets/male.webp'}
              width={'55px'}
              alt='User'
              className='img-fluid border rounded-circle mx-2'
            />
            <Card.Title
              className='text-center'
              style={{ cursor: 'pointer' }}
              onClick={() => handleViewUser(users[index])}
            >
              {users[index].firstName} {users[index].lastName}
            </Card.Title>
            <Card.Text className='text-center'>
              <span className='text-secondary'>
                {users[index].connections
                  .slice(0, 2)
                  .map(connectionId => users.find(user => user.id === connectionId)?.firstName)
                  .filter(Boolean)
                  .join(', ')}{' '}
                are mutual friends
              </span>
            </Card.Text>
            <Button
              onClick={() =>
                currentUser.connections.includes(users[index].id)
                  ? handleUnfollow(currentUser.id, users[index].id)
                  : handleFollow(currentUser.id, users[index].id)
              }
              className='mx-auto d-block btn-sm bg-main border-0'
            >
              {currentUser.connections.includes(users[index].id) ? 'Unfollow' : 'Follow'}
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }, [currentUser.connections, handleFollow, handleUnfollow])

  return (
    <div>
      <Container>
        {' '}
        <Row className='mt-5'>
          <Col md={2} className='d-flex align-items-center justify-content-center'></Col>

          <Col className='bg-light text-dark text-center text-light p-4 rounded shadow mx-5'>
            <Image
              src={viewUser?.gender === 'Male' ? '/assets/male.webp' : '/assets/female.png'}
              alt='User Icon'
              className='img-fluid rounded-circle mb-3 mt-4'
              width={100}
              height={100}
            />
            <h3>{viewUser?.firstName}</h3>
            <small>Ex Software Developer @NASA</small>

            {/* Description */}
            <p className='my-3 px-5'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              is simply dummy text of the printing and typesetting industry.
            </p>
            <p className='my-3'>Gender: {viewUser?.gender}</p>
            <p>
              Connections: <Badge bg='secondary'>{isAdmin && viewUser?.connections?.length}</Badge>
            </p>
            <p>
              Tags: <Badge bg='secondary'>{isAdmin && viewUser?.wishlist?.length}</Badge>
            </p>

            {/* Social Icons */}
            <div className='d-flex justify-content-center'>
              <Facebook /> <Instagram />
              <Linkedin />
            </div>
          </Col>

          <Col md={3} className='text-center'>
            <Badge bg='secondary' className='mb-3'>
              You might Know!
            </Badge>
            <List
              width={300}
              height={480}
              rowHeight={200}
              rowCount={users.length}
              rowRenderer={rowRenderer}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

UserList.propTypes = {
  style: PropTypes.object,
  index: PropTypes.number,
  key: PropTypes.string
}

export default UserList
