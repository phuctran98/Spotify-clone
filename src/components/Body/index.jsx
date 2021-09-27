import React from 'react';
import './Body.scss'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import useGetParams from '../../Hooks/useGetParams';
import Header from '../Header';
import RowSong from '../SongRow';

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/1punMWqcnG6MgyVRs3k7iN";
function Body(props) {
    const {songsOfPlayList,choiceSong} = props
    return (
        <div className="body">
            <Header />
            <div className="body__info">
                <img src="https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7efbaff198348e273fa1330b/2/en/large" alt='PLAYLIST'></img>
                <div className="body__infoText">
                    <p>PLAYLIST</p>
                    <h2>Discover Weekly</h2>
                    <p>Da LAB, MONSTAR, hooligan. and more</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon
                        className="body__shuffle"
                    // onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large"  className="body__favorite"/>
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

export default Body;