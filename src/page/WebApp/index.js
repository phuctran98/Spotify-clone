import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifygetPlayList from './components/SpotifyGetPlayList';
import './WebApp.scss'
WebApp.propTypes = {
    
};
const CLIENT_ID = "5e1dec94c0734988b3a1413d8fbd687b"
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/spotify"
const SPACE_DELIMITER = "%20"
const SCOPES = ["user-read-currently-playing","user-read-playback-state","playlist-read-private"]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

const getReturnedParamsFromSpotifyAuth = (hash) =>{
    const stringAfterHashtag = hash.substring(1)
    console.log("stringAfterHashtag:",stringAfterHashtag)
    const paramsInUrl = stringAfterHashtag.split("&")
    console.log("paramsInUrl:",paramsInUrl  )

    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue)=>{
        const [key,value] = currentValue.split("=")

        accumulater[key] = value
        console.log(accumulater)
        return accumulater
     },{})
     return paramsSplitUp
}
function WebApp(props) {
    useEffect(()=>{
        if(window.location.hash){
            // const {object} = getReturnedParamsFromSpotifyAuth(window.location.hash)
            const {access_token,expires_in,token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash)
            // console.log({access_token})
            localStorage.clear()
            localStorage.setItem('accessToken',access_token)
            localStorage.setItem('tokenType',token_type)
            localStorage.setItem('expiresIn',expires_in)
        }}
    )
    const handleLogin = () =>{
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
    }
    return (
        <div className="webapp">
            <img src="/images/spotify-logo1.png" />
           
            <button onClick={handleLogin} className="webapp__button">Login to spotify</button>
            {/* <SpotifygetPlayList/> */}
        </div>
    );
}

export default WebApp;