import { createSlice } from '@reduxjs/toolkit'


export const listOfFeaturesLists = createSlice({
  name: 'listOfFeaturesLists',
  initialState:{},
  reducers: {
    newFeaturesListsLoading: (state,action) =>{
      const newReleases = action.payload
        // state = action.payload
        // console.log("sstateslice",state)
      return newReleases
    }
  },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = listOfFeaturesLists
export const { newFeaturesListsLoading } = actions

export default reducer