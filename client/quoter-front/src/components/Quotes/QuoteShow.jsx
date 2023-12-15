/* eslint-disable react/prop-types */
import { useId, useState } from 'react'
import ViewQuote from './ViewQuote'
import Heart from 'react-heart'
import { useQuote } from '../../hooks/useQuote'
import Quote from '../../icons/quote'
import { Button, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTags, getUsers } from '../../reducers/userSlice'
import { SET_AlERT } from '../../reducers/alertSlice'
import itn from '../../../src/utils/images/urls.json'

const QuoteShow = props => {
  const [active, setActive] = useState(false)
  const [tagId] = useId()

  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)

  const currentUser = users[0]

  const addTagsInWishlist = tag => {
    dispatch(addTags({ userId: currentUser.id, tag }))
    dispatch(SET_AlERT({ msg: `${tag} added to wishlist` }))
    dispatch(getUsers())
  }

  const { likeQuote } = useQuote()
  return (
    <ul className='list-unstyled text-center '>
      {props?.quotes.map(quote => (
        <li key={quote._id} className='bg-white rounded mb-5'>
          <Container className='px-5'>
            <h3>AUTHOR</h3>
            <p>
              Published At <small className=''>{quote.createdAt}</small>
            </p>
            <Quote />
            <span className='quoted display-6'>{quote.description}</span>
            <div>
              {quote.tags.map(tag => (
                <Button
                  key={`${tag}-${tagId}`}
                  onMouseOver={e => (e.target.innerText = 'Add to Wishlist')}
                  onMouseOut={e => (e.target.innerText = '#' + tag)}
                  onClick={() => addTagsInWishlist(tag)}
                  className='mx-2 btn-wishlist'
                  size='sm'
                >
                  #{tag}
                </Button>
              ))}
            </div>

            <div className='d-flex align-items-center justify-content-center mt-3'>
              <strong className='mr-2 text-main'>{quote.like.length} Likes</strong>
              <div className='mx-2' style={{ width: '2rem' }}>
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
          </Container>
          <Image
            className='rounded mt-5'
            src={itn.DUMMY_IMAGE_FOR_QUOTES}
            alt='Writing gif'
            style={{ width: '90%', height: '60vh', objectFit: 'cover' }}
          />
        </li>
      ))}
    </ul>
  )
}

export default QuoteShow
