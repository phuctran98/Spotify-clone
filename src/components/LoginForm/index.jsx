import React from 'react';

import { useState } from 'react';
// import "./LoginForm.css"
// import { FirebaseContext } from '../../Context/FirebaseContext';
import { useAuth } from '../../Context/AuthContext';
import { NavLink, useHistory } from 'react-router-dom';
import './LoginForm.scss'


function LoginForm(props) {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const {firebase} = useContext(FirebaseContext);
    const auth = useAuth()
    return (
        <div className="login" >
            <div className="login__image">
                
            </div>
            <form className="login__form" onSubmit={e => {
                    e.preventDefault()
                    auth.signin({
                        email, password, callback: () => {
                            history.push('/webapp')
                        }
                    })
                    setEmail('')
                    setPassword('')
                }}>
                    <p className="login__form__header">Login User</p>
    
                    <input placeholder="Email" type="text" onChange={e => setEmail(e.target.value)} className="login__form__email"></input>

                    <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} className="login__form__password"></input>
                    <NavLink to="/signup" className="login__form__signup">Sign up</NavLink>
                    {/* <Link  className="login__form__signup"></Link> */}
                    <button color="secondary" type="submit" className="">Login</button>
                </form>
        </div>
    );
}

export default LoginForm;