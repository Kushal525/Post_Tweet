import React, { useState } from 'react';
import Axios from 'axios';
import '../App.css';
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password:password
            
    });
    }
    

    return(
        <div style={{margin: "120px"}}>
            <form onSubmit={submitLogin}>
            <h1>Login Page</h1>
                <center>
                <div style={{width:"500px"}}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaUser size="2em"/></span>
                        </div>
                        <input type="text" className="form-control" name="username" placeholder="User Name" onChange={(e) => {setUserName(e.target.value)}} />
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FaKey size="2em"/></span>
                        </div>
                        <input placeholder="Password" className="form-control" type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                </div>
                <button className="myPost_button btn btn-outline-primary" onClick={submitLogin} >login</button>
                </center>
            </form>
        </div>
    )
}

export default Login
