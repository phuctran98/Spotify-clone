import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import "./SideBar.scss"
import SideBarOption from '../SideBarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDispatch ,useSelector} from 'react-redux';
import {playListLoading} from '../../page/SpotifyApp/userPlaylistSlice'
SideBar.propTypes = {

};


function SideBar(props) {
    const {changePlayList} = props
    const data = useSelector(state=>state.userPlaylists)
    const handleClick = (item) =>{
        changePlayList(item.id)
    }
    return (
        <div className="sidebar">
            <img className="sidebar__logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="">
            </img>
            <SideBarOption Icon={HomeIcon} option="Home" className="sidebar__title"/>
            <SideBarOption Icon={SearchIcon} option="Search" />
            <SideBarOption Icon={LibraryMusicIcon} option="Your Library" />
            <br />
                <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            {data?.items ? data.items.map((item) => <p className="sidebar__playlist" key={item.id} onClick={()=>handleClick(item)}>{item.name} </p>) : null}
        </div>
    );
}

export default SideBar;