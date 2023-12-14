/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import NewQuote from './NewQuote'

export default function ViewQuote(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='outline-dark' size='sm' className='px-3' onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>Edit Post</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <NewQuote
            actionBtn='Update'
            data={props?.data}
            fetchData={props.fetchData}
            closeModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
