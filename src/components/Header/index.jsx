import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar } from "@material-ui/core";
import "./Header.scss"
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

Header.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginLeft : "1px",
      marginRight : "8px"
    },

  }));
function Header(props) {
    const classes = useStyles();
    return (
        <div className="header">
            <div className="header__left">
                <SearchIcon />
                <input
                    className="sreachInput"
                    placeholder="Search for Artists, Songs, or Podcasts "
                    type="text"
                />
            </div>
            <div className="header__right">
                <Avatar className={classes.avatar}/>
                <h4>Phuc</h4>
            </div>
        </div>
    );
}

export default Header;