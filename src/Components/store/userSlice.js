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
      console.log(state)
      state.username = action.payload.username
      state.email = action.payload.email
      // state.token = action.payload.token
      state.image = action.payload.image
      state.isAuthorized = !!action.payload.username
    },

    removeUser(state) {
      console.log(state)
      state.username = null
      state.email = null
      state.token = null
      state.image = null
      state.isAuthorized = false
    },
    setLoading(state, action) {
      // console.log(action.payload)
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      console.log(state)
    },
  },
})

export default userSlice.reducer
export const { setUser, removeUser, setLoading, setError } = userSlice.actions
