import React from 'react';
import PropTypes from 'prop-types';
import './NavigationBar.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';

NavigationBar.propTypes = {

};

function NavigationBar(props) {
    const auth = useAuth()
    return (
        <header className="NavigationBar">
            <nav>
                <ul>
                    <div className="spotify-logo">
                        <img src="/images/spotify-logo.png"></img>
                    </div>
                    <Link to='/'><li>Home</li></Link>
                    {auth.user ? 
                    (<>
                        <Link to='/webapp'><li>Web App</li></Link>
                        <Link to='/login' onClick={()=>auth.signout()}><li>Logout</li></Link></>
                    ) :
                    (<>
                        <Link to='/signup'><li>Signup</li></Link>
                        <Link to='/login'><li>Login</li></Link></>)}
                </ul>
            </nav >
        </header >
    );
}

export default NavigationBar;