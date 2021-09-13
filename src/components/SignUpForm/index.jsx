import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import "./SignUpForm.scss"
// import { FirebaseContext } from '../../Context/FirebaseContext';
import { useAuth } from '../../Context/AuthContext';
import WebApp from '../../page/WebApp';
import {useHistory} from "react-router-dom"


const SignUpForm = () => {
    let history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const {firebase} = useContext(FirebaseContext);
    const auth = useAuth();
    return (
        <div className="signup">
            <div className="signup__image">

            </div>
            <form className="signup__form" onSubmit={e => {
                e.preventDefault()
                auth.signup({ email, password, callback: () => {history.push("/webapp") } })
                setEmail('')
                setPassword('')
                console.log(email)
            }}>
                <p className="signup__form__header" >Sign Up User</p>
                <input placeholder="Email" type="text" onChange={e => setEmail(e.target.value)} className="signup__form__email" ></input>
                <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}className="signup__form__password"></input>
                <button color="secondary" type="submit" >Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;