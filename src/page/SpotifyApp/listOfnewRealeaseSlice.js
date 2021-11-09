import { createSlice } from '@reduxjs/toolkit'


export const listOfnewReleases = createSlice({
  name: 'listOfnewReleases',
  initialState:{},
  reducers: {
    newReleasesLoading: (state,action) =>{
      const newReleases = action.payload
      console.log('newReleasesLoading')
        // state = action.payload
        // console.log("sstateslice",state)
      return newReleases
    }
  },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = listOfnewReleases
export const { newReleasesLoading } = actions

export default reducer