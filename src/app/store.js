import { configureStore } from '@reduxjs/toolkit'
// import { token } from '../page/SpotifyApp/tokenSlice'
import  userPlaylistReducer  from '../page/SpotifyApp/userPlaylistSlice'


const rootReducers = {
    userPlaylists : userPlaylistReducer,
    // token : token
}
export const store = configureStore({
  reducer: rootReducers
})

export default store
