import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedClients: []
};

export const selectedItemSlice = createSlice({
  name: 'listSelected',
  initialState,
  reducers: {
    processSelected: (state, action) => {
        console.log(action)
      state.selectedClients = action.payload;
      console.log(state.selectedClients)
    },
  },
})

// Action creators are generated for each case reducer function
export const { processSelected } = selectedItemSlice.actions

export default selectedItemSlice.reducer