import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { QuoteContextProvider } from './contexts/QuoteContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QuoteContextProvider>
        <App />
      </QuoteContextProvider>
    </Provider>
  </React.StrictMode>
)
