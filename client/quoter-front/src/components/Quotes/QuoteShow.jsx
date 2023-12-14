/* eslint-disable react/prop-types */

import { useState } from 'react'
import ViewQuote from './ViewQuote'
import Heart from 'react-heart'
import { useQuote } from '../../hooks/useQuote'

const QuoteShow = props => {
  const [active, setActive] = useState(false)
  const { likeQuote } = useQuote()
  return (
    <ul className='list-unstyled'>
      {props?.quotes.map(quote => (
        <li key={quote._id} className='bg-white rounded mb-2 p-3'>
          <p>
            <small className='d-flex'>{quote.createdAt}</small>
          </p>

          <span className='quoted display-6'>{quote.description}</span>

          <div className='d-flex align-items-center mt-5'>
            <strong className='mr-2'>{quote.like.length} Likes</strong>
            <div className='d-inline-block mx-2' style={{ width: '2rem' }}>
              <Heart
                isActive={active}
                onClick={async () => {
                  await likeQuote(quote._id)
                  props.fetchData()
                  setActive(!active)
                }}
              />
            </div>
            <ViewQuote data={quote} fetchData={props?.fetchData} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default QuoteShow
