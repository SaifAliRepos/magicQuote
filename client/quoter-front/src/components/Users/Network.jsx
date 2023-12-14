/* eslint-disable no-magic-numbers */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followRequest, getUsers, unfollowRequest } from '../../reducers/userSlice'
import { Button, Card, Col, Row } from 'react-bootstrap'

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

  return (
    <div>
      <h2>User List</h2>
      <Row>
        <Col md={3}>
          {users.map(user => (
            <Card key={user.id} className='mb-4'>
              <Card.Body>
                <Card.Title className='text-center'>
                  {user.firstName} {user.lastName}
                </Card.Title>
                <Card.Text className='text-center'>{user.connections} connections</Card.Text>
                <Button
                  onClick={() =>
                    currentUser.connections.includes(user.id)
                      ? handleUnfollow(currentUser.id, user.id)
                      : handleFollow(currentUser.id, user.id)
                  }
                  className='mx-auto d-block'
                >
                  {currentUser.connections.includes(user.id) ? 'Unfollow' : 'Follow'}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col></Col>
      </Row>
    </div>
  )
}

export default UserList
