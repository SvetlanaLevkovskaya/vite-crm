import { useDispatch } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import { themeReducer, themeStoreName } from './theme'

export const store = configureStore({
  reducer: {
    [themeStoreName]: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
