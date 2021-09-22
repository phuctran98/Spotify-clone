import React from 'react';
// import PropTypes from 'prop-types';
import './Footer.scss'

import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
// Footer.propTypes = {

// };

function Footer(props) {
    const { isPlaying, setIsPlaying,duration,currentTime,currentSong,
        skipSong,progressBar,progressBarVolume,changeRange,changeRangeVolum,
        audioMuted, setAudioMuted
    } = props
    // console.log("duration footer",duration)
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
                <img className="footer__left__albumLogo" alt='image_song'
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
                    <div className="time">{currentTime ? calculateTime(currentTime) : "0:00"}</div>
                    <input type="range" className="footer__center__playbackBar__progressBar" ref={progressBar} onChange={changeRange}></input>
                    <div className="time">{duration ? calculateTime(duration) : "0:00"}</div>
                </div>
            </div>
            <div className="footer__right">
                <div className="footer__right__all">
                    <div>
                        <PlaylistPlayIcon className="footer__icon" ></PlaylistPlayIcon>
                    </div>
                    <div className="footer__right__controllVolume">
                        {
                            audioMuted ? <VolumeOffIcon className="footer__icon" onClick={()=>setAudioMuted(!audioMuted)} /> 
                                        : <VolumeUpIcon className="footer__icon" onClick={()=>setAudioMuted(!audioMuted)} />
                        }
                        
                        <input type="range" className="footer__right__rangeVolume" ref={progressBarVolume} onChange={changeRangeVolum} max="1" min="0" step="0.1"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;