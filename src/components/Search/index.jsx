import React, { useEffect, useRef, useState } from 'react';
import './Search.scss'
// import useGetParams from '../../Hooks/useGetParams';
import Header from '../Header';
import { useSelector } from 'react-redux';

import RowSong from '../SongRow';

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/1punMWqcnG6MgyVRs3k7iN";
function Search(props) {
    const { changePlayList, changeIdanAlbum } = props

    const [scrollHeader, setScrollHeader] = useState(false)
    const [searchStatus, setSearchStatus] = useState(true)
    const searchData = useSelector(state => state.searchData)
    const prevScrollY = useRef(0);
    const onScroll = (e) => {
        const currentScrollY = e.target.scrollTop
        if (prevScrollY.current < currentScrollY) {
            setScrollHeader(true)
        }
        else {
            setScrollHeader(false)
        }
        prevScrollY.current = currentScrollY;
    };
    useEffect(() => {
        console.log('searchdaat', searchData)
    })
    const choiceAlbum = (id) => {
        changeIdanAlbum(id)
    }
    const choicePlayList = (id) => {
        console.log(id)
        changePlayList(id)
    }
    return (
        <div className="search" onScroll={onScroll} >
            <Header scrollHeader={scrollHeader} searchStatus={searchStatus} />
            <div className='main__body'>
                <h2>
                    Album
                </h2>
                <div className="main__body__listalbum">
                    {searchData?.albums?.items.slice(0, 6).map((item) => (
                        <div className='itemalbum' key={item.id}
                            onClick={() => choiceAlbum(item.id)}
                        //  onClick={() => choiceAlbum(item.id)}
                        >
                            <img src={item.images[1].url} alt='new realease' />
                            <div className='itemalbum__text'>
                                <h4>{item.name}</h4>
                                <div className='itemalbum__text__description'>
                                    {item.artists.map(item => `${item.name} `)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>
                    Playlist
                </h2>
                <div className="main__body__listalbum">
                    {searchData?.playlists?.items.slice(0, 6).map((item) => (
                        <div className='itemalbum' key={item.id}
                            onClick={() => choicePlayList(item.id)}
                        //  onClick={() => choiceAlbum(item.id)}
                        >
                            <img src={item.images[0].url} alt='new realease' />
                            <div className='itemalbum__text'>
                                <h4>{item.name}</h4>
                                <div className='itemalbum__text__description'>
                                    {item.owner.display_name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
}

export default Search;