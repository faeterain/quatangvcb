import { configureStore } from '@reduxjs/toolkit'
import selectedItemReducer from './selectedItemSlice'

export const store = configureStore({
  reducer: {
    selectedItem: selectedItemReducer
  },
})