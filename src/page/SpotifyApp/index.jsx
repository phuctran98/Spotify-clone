import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useGetParams from '../../Hooks/useGetParams';

import "./SpotifyApp.scss"
import styles from '../../components/Footer/Footer.scss'
import axios from 'axios';

import SideBar from '../../components/SideBar';
import PlayList from '../../components/PlayList';
import Footer from '../../components/Footer';

import { playListLoading } from './userPlaylistSlice';
import { newReleasesLoading } from './listOfnewRealeaseSlice';
import { newFeaturesListsLoading } from './listOfFeaturesPlaylists';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useHistory
} from "react-router-dom";
import Main from '../../components/Main';
import Albumlist from '../../components/Album';
import Search from '../../components/Search';

const LIST_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const SONG_OF_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists";
const GET_AN_ALBUM = "https://api.spotify.com/v1/albums";
const LIST_OF_NEW_RELEASES = 'https://api.spotify.com/v1/browse/new-releases';
const LIST_OF_FEATURED_PLAYLISTS = 'https://api.spotify.com/v1/browse/featured-playlists';


function SpotifyApp(props) {
    const [currentSong, setCurrentSong] = useState('')
    const [songsOfPlayList, setSongsOfPlayList] = useState()
    const [songsOfAlbumList, setSongsOfAlbumList] = useState({})
    const [idPlayList, setIdPlayList] = useState('')
    const [indexOfSong, setIndexOfSong] = useState(0)
    const [imgAlbum,setImgAlbum] = useState('')

    const [idanAlbum, setIdanAlbum] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioMuted, setAudioMuted] = useState(false)

    const audioRef = useRef()
    const progressBar = useRef()
    const progressBarVolume = useRef()
    const animationRef = useRef()


    const dispatch = useDispatch()
    const [token, setToken] = useState("")

    const url = window.location.hash
    const { access_token, expires_in, token_type } = useGetParams(url)
    const match = useRouteMatch();
    // console.log("currentSong",currentSong)
    // console.log("idPlayList",idPlayList)
    let history = useHistory();

    useEffect(() => {
        function handleToken() {
            if (url) {
                localStorage.clear()
                localStorage.setItem('accessToken', access_token)
                localStorage.setItem('tokenType', token_type)
                localStorage.setItem('expiresIn', expires_in)
            }
        }
        handleToken()
    }, [access_token, token_type, expires_in, url])
    //get list playlist 
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
        if (token) {
            axios.get(LIST_PLAYLISTS_ENDPOINT, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then(response => {
                // console.log("list play list ",response.data)
                const action = playListLoading(response.data)
                // console.log("data",data)
                dispatch(action)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [token, dispatch])
    //get list of album
    useEffect(() => {
        if (idanAlbum) {
            if (localStorage.getItem('accessToken')) {
                setToken(localStorage.getItem('accessToken'))
            }
            if (token) {
                axios.get(`${GET_AN_ALBUM}/${idanAlbum}`, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }).then(response => {
                    setSongsOfAlbumList(response.data)
                    // console.log('list of album')
                    setImgAlbum(response.data.images[1].url)
                    // console.log("test:", response.data)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }, [idanAlbum,token])
    //get list of my new releas
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
        if (token) {
            axios.get(LIST_OF_NEW_RELEASES, {
                params: {
                    country: 'VN',
                    limit: 6
                },
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then(response => {
                // console.log("list new release ",response.data)
                const action = newReleasesLoading(response.data)
                // console.log("data",data)
                dispatch(action)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [token, dispatch])
    //get list of features lists
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
        if (token) {
            axios.get(LIST_OF_FEATURED_PLAYLISTS, {
                params: {
                    country: 'VN',
                    limit: 6
                },
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then(response => {
                const action = newFeaturesListsLoading(response.data)
                // console.log("data",data)
                dispatch(action)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [token, dispatch])
    //get song of playlist
    useEffect(() => {
        if (idPlayList) {
            if (localStorage.getItem('accessToken')) {
                setToken(localStorage.getItem('accessToken'))
            }
            if (token) {
                axios.get(`${SONG_OF_PLAYLISTS_ENDPOINT}/${idPlayList}`, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }).then(response => {
                    setSongsOfPlayList(response.data)
                    // console.log("respondata:",songsOfPlayList)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }, [idPlayList, token])
    //play song
    useEffect(() => {
        if (currentSong) {
            if (isPlaying) {
                audioRef?.current.play()

                // console.log('1',audioRef.current)
                audioRef.current.volume = 0.5
                animationRef.current = requestAnimationFrame(whilePlaying)
            }
            else {
                audioRef?.current.pause();
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPlaying, currentSong])
    //auto next song
    useEffect(() => {
        // console.log('what song',songsOfPlayList)
        // audioRef.current.addEventListener('ended', () => {
        //         setIsPlaying(false)
        //         console.log('songsOfPlayList',songsOfPlayList.tracks)
        //         // audioRef.current.pause()
        //         // console.log('what song',songsOfPlayList)
        //         // setCurrentSong(songsOfPlayList?.tracks?.items[indexOfSong+1].track)
        //         // audioRef.current.load()
        //         // setIsPlaying(true)
        //         // audioRef.current.play()
        // });
        // if(audioRef.current.onended ){

        // }

        // console.log('next dc')


        //     audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        //     console.log(' k next dc')
        // }
        // return () => {
        //     audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        // };
    }, []);
    // choice song to play
    function choiceSong(newItem,index) {
        setIsPlaying(true)
        // console.log('newItem',newItem)
        setCurrentSong(newItem)
        setIndexOfSong(indexSong(newItem.id,index))
        // console.log("indexSong",indexSong(newItem.track.id))
        // console.log("choie song to play:",currentSong)
    }
    //change id playlist
    function changePlayList(id) {
        history.push({ pathname: `${match.url}/playlist`, state: { idPlayListPass: id } })
        setIdPlayList(id)
    }
    function changeIdanAlbum(id) {
        // console.log('id an ',id)
        history.push({pathname: `${match.url}/album`, state : {idAnAlbumPass : id }})
        setIdanAlbum(id)
    }
    //check index of song 
    const indexSong = (id,index) => {
        const listofSongPlayList = songsOfPlayList?.tracks?.items  
        const listofSongAlbum = songsOfAlbumList?.tracks?.items  
        
        if(index===1){
            const index = listofSongPlayList.findIndex((item) => item.track.id === id)
        }
        if(index===2){
            const index = listofSongAlbum.findIndex((item) => item.id === id)
        }
        return index
        // if(songsOfAlbumList){
            // console.log('songsOfAlbumList',songsOfAlbumList)
        //    listofSong = songsOfAlbumList.tracks.items
        // }
        // const index = listofSong.findIndex((item) => item.track.id === id)
        // return index
    }

    //skip song 
    const skipSong = (foward = true) => {
        const nextSong = songsOfPlayList?.tracks
        if (foward) {
            if (indexOfSong === nextSong.items.length - 1) {
                setIndexOfSong(0)
                setCurrentSong(nextSong.items[indexOfSong].track)
            }
            else {
                setIndexOfSong(indexOfSong + 1)
                setCurrentSong(nextSong.items[indexOfSong].track)

            }
            // console.log("nextSOng",songsOfPlayList?.tracks.items[indexOfSong+1])
            // console.log("currentSOng",currentSong)
        }
        else {
            if (indexOfSong === 0) {
                setIndexOfSong(nextSong.items.length - 1)
                setCurrentSong(nextSong.items[indexOfSong].track)
            }
            else {
                setIndexOfSong(indexOfSong - 1)
                setCurrentSong(nextSong.items[indexOfSong].track)

            }
        }
    }
    const whilePlaying = () => {
        progressBar.current.value = audioRef?.current?.currentTime
        changeProgressBarCurrentTime()

        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    //set duration
    const changeProgressBarCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    useEffect(() => {
        const seconds = Math.floor(audioRef.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

    const changeRange = () => {
        audioRef.current.currentTime = progressBar.current.value
        changeProgressBarCurrentTime()
    }

    const changeRangeVolum = () => {
        audioRef.current.volume = progressBarVolume?.current.value
    }

    useEffect(() => {
        audioRef.current.muted = audioMuted
    }, [audioMuted])

    return (
        <div className="spotifyapp">
            <audio src={currentSong?.preview_url} ref={audioRef}></audio>
            <div className="spotifyapp__body">
                <SideBar changePlayList={changePlayList} ></SideBar>

                <Switch>
                    <Route exact path={`${match.url}/`}>
                        <Main changePlayList={changePlayList} changeIdanAlbum={changeIdanAlbum} />
                    </Route>
                    <Route path={`${match.url}/playlist`}>
                        <PlayList songsOfPlayList={songsOfPlayList}
                            choiceSong={choiceSong}
                        />
                    </Route>
                    <Route path={`${match.url}/album`}>
                        <Albumlist songsOfAlbumList={songsOfAlbumList}
                            choiceSong={choiceSong} imgAlbum={imgAlbum}
                        />
                    </Route>
                    <Route path={`${match.url}/search`}>
                        <Search changePlayList={changePlayList} changeIdanAlbum={changeIdanAlbum}
                        />
                    </Route>
                </Switch>
            </div>
            <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} duration={duration} className={styles.footer}
                currentTime={currentTime} currentSong={currentSong}
                skipSong={skipSong} progressBar={progressBar} progressBarVolume={progressBarVolume} changeRange={changeRange}
                changeRangeVolum={changeRangeVolum} audioMuted={audioMuted} setAudioMuted={setAudioMuted} imgAlbum={imgAlbum}
            >

            </Footer>
        </div>
    );
}

export default SpotifyApp;