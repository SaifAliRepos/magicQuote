/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'

export const PrivateRoutes = ({ Component }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const isLoading = useSelector(state => state.auth.loading)
  //when page is refreshed redux init thats why loading is true and data is not loaded

  if (isLoading && !isAuthenticated) {
    return (
      <div className='text-center p-5'>
        <div className='spinner-border p-3 mt-5' role='status'>
          <span className='sr-only'></span>
        </div>
        <p>Try to sign in again! Your session might have expired</p>
      </div>
    )
  }

  return <Component />
}
