/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import QuoteShow from './QuoteShow'
// import NewQuote from './NewQuote'
import { useQuote } from '../../hooks/useQuote'
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup
} from 'react-bootstrap'
import NewQuote from './NewQuote'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])
  const [originalQuotes, setOriginalQuotes] = useState([])
  const [showNewPost, setShowNewPost] = useState(false)
  const { getQuote } = useQuote()

  const fetchData = async () => {
    try {
      const data = await getQuote()
      setQuotes(data?.quotes)
      setOriginalQuotes(data?.quotes)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = e => {
    const value = e.target.value
    setSearchQuery(value)

    if (value === '') {
      setQuotes(originalQuotes)
    } else {
      const filtered = originalQuotes.filter(quote =>
        quote.description.toLowerCase().includes(value.toLowerCase())
      )
      setQuotes(filtered)
    }
  }
  const handleSort = field => {
    const sortedQuotes = [...quotes]

    if (field === 'createdAt') {
      sortedQuotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (field === 'likes') {
      sortedQuotes.sort((a, b) => a.like.length - b.like.length)
    }

    setQuotes(sortedQuotes)
  }

  const handleShowNewPost = () => {
    setShowNewPost(true)
  }
  const handleHideNewPost = () => {
    setShowNewPost(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gray'>
      <Row>
        <Col className='rounded p-0'>
          <Container className='p-5'>
            {showNewPost && (
              <NewQuote
                actionBtn='Post'
                fetchData={() => {
                  fetchData()
                  handleHideNewPost()
                }}
              />
            )}
            <InputGroup className='mb-3'>
              <Button className='btn-light' onClick={handleShowNewPost}>
                New Post
              </Button>
              <FormControl
                type='text'
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder='Search quotes by description...'
              />
              <DropdownButton variant='dark' title='Sort By' id='dropdown-basic-button' size='sm'>
                <Dropdown.Item onClick={() => handleSort('createdAt')}>Created At</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSort('likes')}>Likes</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Container>
          <QuoteShow fetchData={fetchData} quotes={quotes} />
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(Quotes)
