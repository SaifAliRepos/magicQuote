/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-magic-numbers */
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followRequest, getUsers, unfollowRequest } from '../../reducers/userSlice'
import { Badge, Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { List } from 'react-virtualized'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)
  const currentUser = users[0]

  const handleFollow = (userId, followedUserId) => {
    dispatch(followRequest({ userId, followedUserId }))
    dispatch(getUsers())
  }

  const handleUnfollow = (userId, unfollowedUserId) => {
    dispatch(unfollowRequest({ userId, unfollowedUserId }))
    dispatch(getUsers())
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
            <Card.Title className='text-center'>
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
          <Col md={2} className='bg-light'></Col>
          <Col className='bg-dark'></Col>
          <Col md={3} className='text-center'>
            <Badge bg='secondary' className='mb-3'>
              You might Know!
            </Badge>
            <List
              width={300}
              height={500}
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

UserList.displayName = 'UserList'
export default UserList
