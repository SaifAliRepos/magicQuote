import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import NewQuote from './NewQuote'
import itn from '../../constants/contants.json'

export default function ViewQuote(props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant='outline-dark' size='sm' className='px-3' onClick={handleShow}>
        {itn.VIEW_QUOTE}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{itn.EDIT_QUOTE}</strong>
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

ViewQuote.propTypes = {
  data: PropTypes.object,
  fetchData: PropTypes.func.isRequired
}
