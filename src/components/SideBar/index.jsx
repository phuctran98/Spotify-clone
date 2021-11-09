import React from 'react';
import "./SideBar.scss"
import SideBarOption from '../SideBarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import {
    Link,
    useRouteMatch
} from "react-router-dom";
import { useSelector} from 'react-redux';


function SideBar(props) {
    const {changePlayList} = props
    const data = useSelector(state=>state.userPlaylists)
    const match = useRouteMatch();
    const handleClick = (item) =>{
        changePlayList(item.id)
    }
    return (
        <div className="sidebar">
            <img className="sidebar__logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="">
            </img>
            <Link to="/spotify" className="sidebar__link">
                <SideBarOption Icon={HomeIcon} option="Home"  />
            </Link>
            <Link to={`${match.url}/search`} className="sidebar__link">
                <SideBarOption Icon={SearchIcon} option="Search" />
            </Link>
           
            <SideBarOption Icon={LibraryMusicIcon} option="Your Library" />
            <br />
                <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />
            {data?.items ? data.items.map((item) => <p className="sidebar__playlist" key={item.id} onClick={()=>handleClick(item)}>{item.name} </p>) : null}
        </div>
    );
}

export default SideBar;