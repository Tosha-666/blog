import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  username: null,
  email: null,
  token: null,
  image: null,
  isAuthorized: null,
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.token = action.payload.token
      state.image = action.payload.image
      state.isAuthorized = !!action.payload.token
      console.log(action.payload)
    },

    removeUser(state) {
      state.username = null
      state.email = null
      state.token = null
      state.image = null
    },
  },
})

export default userSlice.reducer
export const { setUser, removeUser } = userSlice.actions
