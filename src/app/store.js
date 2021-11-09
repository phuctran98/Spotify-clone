import { configureStore } from '@reduxjs/toolkit'
// import { token } from '../page/SpotifyApp/tokenSlice'
import  userPlaylistReducer  from '../page/SpotifyApp/userPlaylistSlice'
import  listOfnewRealeaseReducer  from '../page/SpotifyApp/listOfnewRealeaseSlice'
import  listOfFeaturesListsReducer  from '../page/SpotifyApp/listOfFeaturesPlaylists'
import searchReducer from '../page/SpotifyApp/searchSlice'

const rootReducers = {
    userPlaylists : userPlaylistReducer,
    listOfnewReleases : listOfnewRealeaseReducer,
    listOfFeaturesLists : listOfFeaturesListsReducer,
    searchData : searchReducer
    // token : token
}
export const store = configureStore({
  reducer: rootReducers
})

export default store
