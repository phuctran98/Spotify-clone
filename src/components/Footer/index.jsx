import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss'

import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
Footer.propTypes = {

};

function Footer(props) {
    const { isPlaying, setIsPlaying,duration,currentTime,currentSong,skipSong } = props
    // console.log("song footer",currentSong)
    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60)
        const returnMinutes = minutes < 10 ? `${minutes}` : minutes 
        const seconds = Math.floor(secs%60)
        const returnSeconds = seconds < 10 ? `0${seconds}` : seconds 
        return `${returnMinutes}:${returnSeconds}`;
    }
    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__left__albumLogo"
                    src={currentSong ? currentSong.album.images[2].url : 'https://i.scdn.co/image/ab67616d000048512f76b797c382bedcafdf45e1'}
                />
                <div className="footer__left__songInfo">
                    <h4>{currentSong ? currentSong?.name : "Prefect"}</h4>
                    <p>{currentSong ? currentSong?.artists[0].name : "Edsheeran"}</p>
                </div>
            </div>
            <div className="footer__center">
                <div className="footer__center__button">
                    <div className="footer__center__button__left">
                        <div className="footer__icon">
                            <ShuffleIcon ></ShuffleIcon>
                        </div>
                        <div className="footer__icon" onClick={()=>skipSong(false)}>
                            <SkipPreviousIcon></SkipPreviousIcon>
                        </div>
                    </div>
                    <div onClick={() => setIsPlaying(!isPlaying)} className="footer__icon" >
                        {isPlaying ? <PauseCircleOutlineIcon fontSize="large"/> : <PlayCircleOutlineIcon fontSize="large" />}
                        
                    </div>
                    <div className="footer__center__button__right">
                        <div className="footer__icon" onClick={()=>skipSong()}>
                            <SkipNextIcon></SkipNextIcon>
                        </div>
                        <div className="footer__icon">
                            <RepeatIcon></RepeatIcon>
                        </div>
                    </div>
                </div>
                <div className="footer__center__playbackBar">
                    <div className="time">{calculateTime(currentTime)}</div>
                    <input type="range" className="footer__center__playbackBar__progressBar"></input>
                    <div className="time">{calculateTime(duration)}</div>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__right__all">
                    <div>
                        <PlaylistPlayIcon className="footer__icon" ></PlaylistPlayIcon>
                    </div>
                    <div className="footer__right__controllVolume">
                        <VolumeUpIcon className="footer__icon"></VolumeUpIcon>
                        <input type="range" className="footer__right__rangeVolume"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;