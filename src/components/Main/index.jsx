import React,{ useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import "./Main.scss"
import Header from '../Header';
function Main(props) {
    const {changePlayList,changeIdanAlbum} = props
    const [scrollHeader, setScrollHeader] = useState(false)
    const listOfnewReleases = useSelector(state => state.listOfnewReleases)
    const listOfFeaturesLists = useSelector(state => state.listOfFeaturesLists)
    const prevScrollY = useRef(0);
    // console.log('listOfnewReleases',listOfnewReleases)
    console.log('listOfFeaturesLists',listOfFeaturesLists)
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
    const choiceAlbum = (id) => {
        changeIdanAlbum(id)
    }
    const choicePlayList = (id) => {
        console.log(id)
        changePlayList(id)
    }
    return (
        <div className='main' onScroll={onScroll}>
            <Header scrollHeader={scrollHeader} />

            <div className='main__body'>
                <h2>
                    New Realease
                </h2>
                <div className="main__body__listalbum">
                    {listOfnewReleases?.albums?.items.map((item) => (
                        <div className='itemalbum' key={item.id} onClick={() => choiceAlbum(item.id)}>
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
                    Features Lists
                </h2>
                <div className="main__body__listalbum">
                    {listOfFeaturesLists?.playlists?.items.map((item) => (
                        <div className='itemalbum' key={item.id} onClick={() => choicePlayList(item.id)} >
                            <img src={item.images[0].url} alt='features Lists' />
                            <div className='itemalbum__text'>
                                <h4>{item.name}</h4>
                                <div className='itemalbum__text__description'>
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;