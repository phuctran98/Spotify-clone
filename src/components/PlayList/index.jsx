import React, { useRef, useState } from 'react';
import './PlayList.scss'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import useGetParams from '../../Hooks/useGetParams';
import Header from '../Header';
import RowSong from '../SongRow';

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/1punMWqcnG6MgyVRs3k7iN";
function PlayList(props) {
    const {songsOfPlayList,choiceSong} = props
    const [scrollHeader, setScrollHeader] = useState(false)
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
    return (
        <div className="playlist" onScroll={onScroll}>
            <Header scrollHeader={scrollHeader}/>
            <div className="playlist__info">
                <img src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7efbaff198348e273fa1330b/2/en/large" alt='PLAYLIST'></img>
                <div className="playlist__infoText">
                    <p>PLAYLIST</p>
                    <h2>Discover Weekly</h2>
                    <p>Da LAB, MONSTAR, hooligan. and more</p>
                </div>
            </div>

            <div className="playlist__songs">
                <div className="playlist__icons">
                    <PlayCircleFilledIcon
                        className="playlist__shuffle"
                    // onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large"  className="playlist__favorite"/>
                    <MoreHorizIcon />
                </div>
                <div>
                {
                    // console.log("helo",data.tracks.items)
                    songsOfPlayList?.tracks?.items.map((item)=>(
                        <RowSong item={item} choiceSong={choiceSong} key={item.track.id}>

                        </RowSong>
                    ))
                }
                </div>
            </div>

        </div >
    );
}

export default PlayList;