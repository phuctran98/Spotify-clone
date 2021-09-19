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
    const [songsOfPlayList,setSongsOfPlayList] = useState({})
    const [idPlayList,setIdPlayList] = useState('')
    const [indexOfSong,setIndexOfSong] = useState(0)

    const [isPlaying,setIsPlaying] = useState(true)
    const [duration,setDuration] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const [audioMuted,setAudioMuted] = useState(false)

    const audioRef = useRef()
    const progressBar = useRef()
    const progressBarVolume = useRef()
    const animationRef = useRef()


    const dispatch = useDispatch()
    const [token,setToken] = useState("")
    const url = window.location.hash
    const {access_token,expires_in,token_type} = useGetParams(url)
    // console.log("listsong",songsOfPlayList)
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
                    setSongsOfPlayList(response.data)
                    // console.log("respondata:",songsOfPlayList)
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
                audioRef?.current.play()
                audioRef.current.volume = 0.5
                animationRef.current = requestAnimationFrame(whilePlaying)
            }
            else{
                audioRef?.current.pause();
                cancelAnimationFrame(animationRef.current)
            }
        } 
    })
    // choice song to play
    function choiceSong(newItem){
        setCurrentSong(newItem.track)
        setIndexOfSong(indexSong(newItem.track.id))
        // console.log("indexSong",indexSong(newItem.track.id))
        console.log("choie song to play:",currentSong)
    }
    //change id playlist
    function changePlayList(id){
        setIdPlayList(id)
    }

    //check index of song 
    const indexSong = (id) =>{
        const listofSong = songsOfPlayList.tracks.items
        const index = listofSong.findIndex((item)=>item.track.id  === id)
        return index
    }
    
    //skip song 
    const skipSong = (foward = true) =>{
        const nextSong = songsOfPlayList?.tracks
        if(foward){
            if(indexOfSong===nextSong.items.length-1){
                setIndexOfSong(0)
                setCurrentSong(nextSong.items[indexOfSong].track)
            }
            else{
                setIndexOfSong(indexOfSong+1)
                setCurrentSong(nextSong.items[indexOfSong].track)
                
            }
            // console.log("nextSOng",songsOfPlayList?.tracks.items[indexOfSong+1])
            // console.log("currentSOng",currentSong)
        }
        else{
            if(indexOfSong===0){
                setIndexOfSong(nextSong.items.length-1)
                setCurrentSong(nextSong.items[indexOfSong].track)
            }
            else{
                setIndexOfSong(indexOfSong-1)
                setCurrentSong(nextSong.items[indexOfSong].track)
                
            }
        }
    }
    const whilePlaying = () => {
        progressBar.current.value = audioRef.current.currentTime
        setCurrentTime(progressBar.current.value)

        animationRef.current=requestAnimationFrame( whilePlaying)
    }
    useEffect(()=>{
        const seconds = Math.floor(audioRef.current.duration) 
        setDuration(seconds)

        progressBar.current.max = seconds
    })
    const changeRange = ()=>{
        audioRef.current.currentTime = progressBar.current.value
        // progressBar.current.style.setProperty('--seek-before-width',`${progressBar.current.value/duration*100}%`)
        setCurrentTime(progressBar.current.value)
    }
    const changeRangeVolum = () =>{
        audioRef.current.volume = progressBarVolume?.current.value
    }
    useEffect(()=>{
        audioRef.current.muted = audioMuted
    },[audioMuted])
    return (
        <div className="spotifyapp">
            <audio src={currentSong?.preview_url} ref={audioRef}></audio>
            <div className="spotifyapp__body">
                <SideBar changePlayList={changePlayList}></SideBar>
                <Body songsOfPlayList={songsOfPlayList} choiceSong={choiceSong} > </Body>
            </div>
            <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} duration={duration} 
                    currentTime={currentTime} currentSong={currentSong} 
                    skipSong={skipSong} progressBar={progressBar} progressBarVolume={progressBarVolume} changeRange={changeRange}
                    changeRangeVolum = {changeRangeVolum} audioMuted={audioMuted} setAudioMuted={setAudioMuted}
                    >

            </Footer>
        </div>
    );
}

export default SpotifyApp;