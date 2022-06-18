import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { SessionStorageProvider } from 'react-sessionstorage'

import { App } from './Components/App'
import { ErrorBoundry } from './Components/ErrorBoundry'
import store from './Components/store'

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <SessionStorageProvider>
        {' '}
        <Router>
          <App />
        </Router>
      </SessionStorageProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
)
