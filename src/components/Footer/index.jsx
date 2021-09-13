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
    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__left__albumLogo"
                    src="/images/background.jpg"

                />
                <div className="footer__left__songInfo">
                    <h4>Perfect</h4>
                    <p>Ed Sheeran</p>
                </div>
            </div>
            <div className="footer__center">
                <div className="footer__center__button">
                    <div className="footer__center__button__left">
                        <ShuffleIcon className="footer__icon"></ShuffleIcon>
                        <SkipPreviousIcon className="footer__icon"></SkipPreviousIcon>
                    </div>

                    <PlayCircleOutlineIcon fontSize="large" className="footer__icon"></PlayCircleOutlineIcon>
                    <div className="footer__center__button__right">
                        <SkipNextIcon className="footer__icon"></SkipNextIcon>
                        <RepeatIcon className="footer__icon"></RepeatIcon>
                    </div>
                </div>
                <div className="footer__center__playbackBar">
                    <div className="time">12.20</div>
                    <input type="range" className="footer__center__playbackBar__progressBar"></input>
                    <div className="time">12.20</div>
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