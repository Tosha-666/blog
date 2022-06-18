import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  email: null,
  token: null,
  image: null,
  isAuthorized: false,
  loading: false,
  error: null,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(state.username)
      state.username = action.payload.username
      state.email = action.payload.email
      state.image = action.payload.image
      state.isAuthorized = !!action.payload.username
    },

    removeUser(state) {
      state.username = null
      state.email = null
      state.token = null
      state.image = null
      state.isAuthorized = false
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export default userSlice.reducer
export const { setUser, removeUser, setLoading, setError } = userSlice.actions
