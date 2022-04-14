import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import api from '../../api'

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async function () {
    const articles = await api.get('api/articles', {
      params: {
        limit: 20,
        offset: 0,
      },
    })
    if (articles.status === 200) {
      return articles.data.articles
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    status: null,
    error: null,
  },
  //   reducers: {
  //     getArticles() {},
  //   },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [getArticles.fulfilled]: (state, action) => {
      state.status = 'resolved'
      console.log(action.payload)
      state.articles = action.payload
    },
    // [getArticles.rejected]: (state, action) => {},
  },
})
export default articlesSlice.reducer
