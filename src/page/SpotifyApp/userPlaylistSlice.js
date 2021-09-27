import { createSlice } from '@reduxjs/toolkit'


export const userPlaylist = createSlice({
  name: 'userPlaylist',
  initialState:{},
  reducers: {
    playListLoading: (state,action) =>{
      const newPlayList = action.payload
        // state = action.payload
        // console.log("sstateslice",state)
      return newPlayList
    }
  },
})

// Action creators are generated for each case reducer function
const { reducer, actions } = userPlaylist
export const { playListLoading } = actions

export default reducer