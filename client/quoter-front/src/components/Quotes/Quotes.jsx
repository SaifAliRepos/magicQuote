import React, { useState, useEffect, Suspense } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import QuoteShow from './QuoteShow'
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
  const [showNewQuote, setShowNewQuote] = useState(false)
  const { getQuote } = useQuote()

  const fetchData = async () => {
    const data = await getQuote()
    setQuotes(data?.quotes)
    setOriginalQuotes(data?.quotes)
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

  const handleShowNewQuote = () => {
    setShowNewQuote(true)
  }
  const handleHideNewQuote = () => {
    setShowNewQuote(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gray'>
      <Row>
        <Col className='rounded p-0'>
          <Container className='p-5'>
            {showNewQuote && (
              <NewQuote
                actionBtn='Post'
                fetchData={() => {
                  fetchData()
                  handleHideNewQuote()
                }}
              />
            )}
            <InputGroup className='mb-3'>
              <Button className='btn-light' onClick={handleShowNewQuote}>
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
          <Suspense fallback={<div>Loading quotes...</div>}>
            <QuoteShow fetchData={fetchData} quotes={quotes} />
          </Suspense>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(Quotes)
