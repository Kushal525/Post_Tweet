import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory} from 'react-router-dom';
import '../App.css';
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import {AuthContext} from '../helpers/Auth'

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setAuthState} = useContext(AuthContext);
    let history = useHistory();
    const [ checkusernamePassword, setUsernamePassword] = useState('')

    const submitLogin = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password:password
            
    }).then((response) => {
        if(response.data !== 'error'){
            localStorage.setItem('accessToken',response.data)
            setAuthState(true);
            history.push('/');
        }
        else{
            setUsernamePassword("Invalid UserName And Password")
        }
    });
    setUserName("");
    setPassword("");
    }
    

    return(
        <div style={{margin: "120px"}}>
            <h1>Login Page</h1>
                <center>
                <div style={{width:"500px"}}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaUser size="2em"/></span>
                        </div>
                        <input type="text" value={username} className="form-control" name="username" placeholder="User Name" onChange={(e) => {setUserName(e.target.value)}} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaKey size="2em"/></span>
                        </div>
                        <input placeholder="Password" value={password} className="form-control" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <span className="seosaph_check_login">{checkusernamePassword}</span><br/>
                </div>
                <button className="myPost_button btn btn-outline-primary" onClick={submitLogin} >login</button>
                </center>
        </div>
    )
}

export default Login
