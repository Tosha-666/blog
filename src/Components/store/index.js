import { configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles'
import userSlice from './userSlice'

export default configureStore({
  reducer: {
    articles: articlesSlice,
    user: userSlice,
  },
})
