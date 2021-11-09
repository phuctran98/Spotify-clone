import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Header.scss"

import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@mui/material/colors';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { searchLoading } from '../../page/SpotifyApp/searchSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: "1px",
        marginRight: "8px"
    },

}));

const USER_PROFILE = "https://api.spotify.com/v1/me";

function Header(props) {
    const [token, setToken] = useState("")
    const [userProfile, setUserProflie] = useState("")
    const { scrollHeader,searchStatus } = props
    const [searchTerm, setSearchTerm] = useState("")

    const dispatch = useDispatch()
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
        }
        if (token) {
            axios.get(USER_PROFILE, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then(response => {
                setUserProflie(response.data)
            })
        }

    }, [token])
    const updateSearchTerm = e => {
        setSearchTerm(e.target.value)
        // console.log(searchTerm)
    }
    // search
    const handleSubmit = e => {
        e.preventDefault();
        axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist,album`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then(response => {
            console.log(response.data)
            const action = searchLoading(response.data)
            dispatch(action)
            // setUserProflie(response.data)
        })
    }
    return (
        <div className={scrollHeader ? 'header active' : 'header'} >
            <div className="header__left">
                <div className="header__left__move" onClick={() => history.goBack()}>
                    <ArrowBackIosIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="header__left__move" onClick={() => history.goForward()}>
                    {/* <ArrowForwardIosIcon sx={{ fontSize: 18}} style={{ color: grey[600] }}/> */}
                    <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                </div>
                <form onSubmit={handleSubmit}>
                    {searchStatus ? <div className="header__left__sreach" >
                        {/* <form> */}
                        <SearchIcon />
                        <input
                            className="sreachInput"
                            placeholder="Search for Artists, Songs, or Podcasts "
                            type="text"
                            onChange={updateSearchTerm}
                            value={searchTerm}
                        />
                    </div> : <div></div>
                    }
                    
                </form>
            </div>
            <div className="header__right">
                <Avatar className={classes.avatar} src={userProfile ? userProfile.images[0].url : ''} />
                <span>{userProfile.display_name}</span>
            </div>

        </div>
    );
}

export default Header;