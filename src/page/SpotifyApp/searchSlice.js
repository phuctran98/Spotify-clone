import { createSlice } from '@reduxjs/toolkit'


export const search = createSlice({
  name: 'search',
  initialState:{},
  reducers: {
    searchLoading: (state,action) =>{
      const searchData = action.payload
      return searchData
    }
  },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = search
export const { searchLoading } = actions

export default reducer