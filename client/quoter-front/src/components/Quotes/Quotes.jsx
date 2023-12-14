import React, { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import QuoteShow from './QuoteShow'
import NewQuote from './NewQuote'
import { useQuote } from '../../hooks/useQuote'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])
  const { getQuote } = useQuote()

  const fetchData = async () => {
    try {
      const data = await getQuote()
      setQuotes(data?.quotes)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-gray'>
      <Container>
        <Row>
          <Col className='rounded p-0'>
            <NewQuote actionBtn='Post' fetchData={() => fetchData()} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <QuoteShow fetchData={fetchData} quotes={quotes} />
            </React.Suspense>
          </Col>
          <Col md={3} className='text-center mt-2'></Col>
        </Row>
      </Container>
    </div>
  )
}

export default React.memo(Quotes)
