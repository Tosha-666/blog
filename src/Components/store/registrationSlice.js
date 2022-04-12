import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const createNewUser = createAsyncThunk()
const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    name: '',
    email: '',
    password: '',
    agreement: true,
  },
  reducers: {
    registerNewUser() {},
  },
})
export default registrationSlice
