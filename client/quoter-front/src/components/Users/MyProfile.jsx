/* eslint-disable no-magic-numbers */
import React from 'react'
import { Badge, Col, Container, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { List } from 'react-virtualized'
import { motion } from 'framer-motion'
import itn from '../../constants/contants.json'

const MyProfile = () => {
  const users = useSelector(state => state.user.users)
  const currentUser = users[0]
  const filteredUsers = users.filter(user =>
    user.connections.some(connection => currentUser.connections.includes(connection))
  )

  const rowRenderer = ({ index, key, style }) => {
    const user = filteredUsers[index]

    return (
      <div key={key} style={style} className='mb-3 d-flex align-items-center shadow'>
        <Image
          src={user.gender === 'Female' ? '/assets/female.png' : '/assets/male.webp'}
          width={'55px'}
          alt='User'
          className='img-fluid border rounded-circle mx-2'
        />
        <span>
          {user.firstName} {user.lastName}
        </span>
        <span className='mx-3'>
          <small>{itn.CONNECTIONS}:</small>
          <Badge bg='secondary'>{user.connections.length}</Badge>
        </span>
      </div>
    )
  }

  return (
    <Container>
      <Row className='bg-light rounded py-2'>
        <Col md={3}>
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 1, delay: 3 }}
            style={{ display: 'inline-block', overflow: 'hidden' }}
          >
            <img
              src='/assets/male.webp'
              alt='Profile'
              className='img-fluid rounded-circle'
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>
        </Col>
        <Col className='mt-4' md={9}>
          <h3>
            {currentUser.firstName} {currentUser.lastName}
          </h3>
          <p>
            {itn.TOTAL_CONNECTIONS}: {currentUser.connections.length}
          </p>
          <p>{itn.NEVER_SETTLE}</p>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <div className='d-inline'>
            <span className='bg-light rounded'>{itn.TAGS_YOU_FOLLOW}: </span>
            {currentUser.wishlist.map(tag => (
              <motion.div
                key={tag}
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block', marginRight: '8px' }}
              >
                <Badge bg='none' className='bg-second'>
                  #{tag}
                </Badge>
              </motion.div>
            ))}
          </div>
          <h4 className='font-weight-bold'>{itn.FOLLOWERS}</h4>
          <List
            width={350}
            height={250}
            rowCount={filteredUsers.length}
            rowHeight={70}
            rowRenderer={rowRenderer}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfile
