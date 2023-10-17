import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice.js'
import authSlice from './slices/auth.js'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authSlice
  },
})