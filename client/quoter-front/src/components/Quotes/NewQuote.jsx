/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import { useQuote } from '../../hooks/useQuote'

function NewQuote(props) {
  const { createQuote, updateQuote } = useQuote()
  const [isLoading, setIsLoading] = useState(false)

  const [quoteData, setFormData] = useState({
    description: props?.data?.description || ''
  })

  const { description } = quoteData
  const quotetId = props?.data?._id || ''

  const onChange = e =>
    setFormData({
      ...quoteData,
      [e.target.name]: e.target.value
    })

  const onSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    if (props.actionBtn === 'Update') {
      await updateQuote({ description }, quotetId)

      props.fetchData()
      props.closeModal()
      setIsLoading(false)
    }

    if (props.actionBtn === 'Post') {
      await createQuote({ description })
      props.fetchData()
      setIsLoading(false)
    }
    setFormData({
      description: ''
    })
  }

  return (
    <div>
      <Container>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group className='mb-4' controlId='formDescription'>
            <Form.Control
              as='textarea'
              rows='5'
              placeholder='Enter description'
              name='description'
              value={description}
              onChange={e => onChange(e)}
              required
            />
          </Form.Group>

          <Button type='submit' size='md px-5' variant='success' disabled={isLoading}>
            {isLoading ? 'Submitting...' : props.actionBtn}
          </Button>
          <hr />
          <p>
            {' '}
            <Badge bg='secondary'>Putting imaginations in reality</Badge>
          </p>
        </Form>
      </Container>
    </div>
  )
}

export default NewQuote
