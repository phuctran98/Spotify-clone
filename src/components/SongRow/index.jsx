import React from 'react';
import './SongRow.scss'

function RowSong(props) {
    const {item,choiceSong} = props
    const handleChoieSong = (item) => {
        // console.log("rowItem",item)
        if(item.track){
            choiceSong(item.track,1)
        }
        else{
            choiceSong(item,2)
        }
        
    }
    return (
        <div className="rowSong" onClick={() => handleChoieSong(item)}>
            {
                item.track? <img className="rowSong__album" src={ item.track.album.images[2].url } alt="" /> : ''
            }
            
            <div className="rowSong__info">
                <h1>{item.track ? item.track.name : item.name}</h1>
                <p>
                    {item.track ? item.track.artists[0].name : item.artists[0].name}
                </p>
            </div>
        </div>
    );
}

export default RowSong;