import React, { useEffect, useRef, useState } from 'react';
import "./SpotifyApp.scss"
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import SideBar from '../../components/SideBar';
import Body from '../../components/Body';
import Footer from '../../components/Footer';
import useGetParams from '../../Hooks/useGetParams';
import { playListLoading } from './userPlaylistSlice';
SpotifyApp.propTypes = {
    
};
const LIST_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SONG_OF_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists";

function SpotifyApp(props) {
    const [currentSong,setCurrentSong] = useState('')
    const [songOfPlayList,setSongOfPlayList] = useState({})
    const [isPlaying,setIsPlaying] = useState(false)
    const [idPlayList,setIdPlayList] = useState('')
    const audioRef = useRef()

    const dispatch = useDispatch()
    const [token,setToken] = useState("")
    const url = window.location.hash
    const {access_token,expires_in,token_type} = useGetParams(url)
    useEffect(()=>{
        if(url){
            // const {object} = getReturnedParamsFromSpotifyAuth(window.location.hash)
            // const {access_token,expires_in,token_type} = useGetParams(window.location.hash)
            // console.log({access_token})
            localStorage.clear()
            localStorage.setItem('accessToken',access_token)
            localStorage.setItem('tokenType',token_type)
            localStorage.setItem('expiresIn',expires_in)
        }},[url]
    )
    //get list playlist
    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            setToken(localStorage.getItem('accessToken'))
        }
        if(token){
            axios.get(LIST_PLAYLISTS_ENDPOINT,{
                headers: {
                    "Authorization": "Bearer " + token,
                  }
            }).then(response=>{
                // console.log("list play list ",response.data)
                // setData(response.data)
                const action = playListLoading(response.data)
                // console.log("data",data)
                dispatch(action)
            }).catch(err=>{
                console.log(err)
            })
        }
    },[token])
    //get song of playlist
    useEffect(()=>{
        if(idPlayList!=null){
            if(localStorage.getItem('accessToken')){
                setToken(localStorage.getItem('accessToken'))
            }
            if(token){
                axios.get(`${SONG_OF_PLAYLISTS_ENDPOINT}/${idPlayList}`,{
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }).then(response=>{
                    setSongOfPlayList(response.data)
                    // console.log("respondata:",songOfPlayList)
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    },[idPlayList])
    //play song
    useEffect(()=>{
        if(currentSong){
            if(isPlaying){
                audioRef.current.play()
            }
            else{
                audioRef.current.pause();
            }
        }
    },[currentSong])
    // choice song to play
    function choiceSong(newItem){
        setCurrentSong(newItem.track.preview_url)
        console.log("newItem:",newItem.track)
    }
    //change id playlist
    function changePlayList(id){
        setIdPlayList(id)
    }
    return (
        <div className="spotifyapp">
            <audio src={currentSong} ref={audioRef}></audio>
            <div className="spotifyapp__body">
                <SideBar changePlayList={changePlayList}></SideBar>
                <Body songOfPlayList={songOfPlayList} choiceSong={choiceSong}></Body>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default SpotifyApp;