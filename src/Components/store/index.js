import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles'
import userSlice from './userSlice'

export default configureStore({
  reducer: {
    articles: articlesSlice,
    user: userSlice,
  },
})
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import { reduser } from '../../redusers'

// const store = createStore(reduser, applyMiddleware(thunk))

// export { store }
