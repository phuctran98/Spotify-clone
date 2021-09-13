import React from 'react';
import './SongRow.scss'

function RowSong(props) {
    const {item,choiceSong} = props
    // console.log("rowsong",item)
    const handleChoieSong = (item) => {
        // console.log("rowItem",item)
        choiceSong(item)
    }
    return (
        <div className="rowSong" onClick={() => handleChoieSong(item)}>
            <img className="rowSong__album" src={item.track.album.images[2].url} alt="" />
            <div className="rowSong__info">
                <h1>{item.track.name}</h1>
                <p>
                    {item.track.artists[0].name}
                </p>
            </div>
        </div>
    );
}

export default RowSong;