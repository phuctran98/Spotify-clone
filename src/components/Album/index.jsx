import React, { useRef, useState } from 'react';
import './Album.scss'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import useGetParams from '../../Hooks/useGetParams';
import Header from '../Header';
import RowSong from '../SongRow';

// const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/playlists/1punMWqcnG6MgyVRs3k7iN";
function Albumlist(props) {
    const {songsOfAlbumList,choiceSong} = props
    const [scrollHeader, setScrollHeader] = useState(false)
    const prevScrollY = useRef(0);
    console.log('songofalbumList',songsOfAlbumList)
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
        <div className="album" onScroll={onScroll}>
            <Header scrollHeader={scrollHeader} />
            <div className="album__info">
                <img src={songsOfAlbumList.images ? songsOfAlbumList?.images[1]?.url : "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb7efbaff198348e273fa1330b/2/en/large"} alt='PLAYLIST'></img>
                <div className="playlist__infoText">
                    <p>ALBUM</p>
                    <h2>{songsOfAlbumList.name ? songsOfAlbumList.name : 'The Album'}</h2>
                    <p>{songsOfAlbumList.artists ? songsOfAlbumList.artists[0].name : 'Artists'}</p>
                </div>
            </div>

            <div className="album__songs">
                <div className="album__icons">
                    <PlayCircleFilledIcon
                        className="album__shuffle"
                    // onClick={playPlaylist}
                    />
                    <FavoriteIcon fontSize="large"  className="album__favorite"/>
                    <MoreHorizIcon />
                </div>
                <div>
                {
                    // console.log("helo",data.tracks.items)
                    songsOfAlbumList?.tracks?.items.map((item)=>(
                        <RowSong item={item} choiceSong={choiceSong} key={item.id} >

                        </RowSong>
                    ))
                }
                </div>
            </div>

        </div >
    );
}

export default Albumlist;