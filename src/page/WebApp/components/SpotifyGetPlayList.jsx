import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
function SpotifygetPlayList(props) {
    const [token,setToken] = useState("")
    const [data,setData] = useState({})

    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            setToken(localStorage.getItem('accessToken'))
        }
    },[])
    const handleGetPlaylist = () =>{
        axios.get(PLAYLISTS_ENDPOINT,{
            headers: {
                "Authorization": "Bearer " + token,
              }
        }).then(response=>{
            setData(response.data)
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            <button onClick={handleGetPlaylist}>Get play list</button>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
        </div>
    );
}

export default SpotifygetPlayList;