import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { reduser } from './redusers'

const store = createStore(reduser, applyMiddleware(thunk))

export { store }
