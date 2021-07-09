import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory} from 'react-router-dom';
import '../App.css';

const Reg = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [userNameMessage, setUserNameMessage] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    let history = useHistory();

    const submitRegister = () => {
        if(!userName){
            setUserNameMessage("Please Enter UserName")
        }else{
                Axios.post('hhtp:localhost:3001/register', {
                first_name: firstName,
                last_name:lastName,
                user_name: userName,
                email_id:emailId,
                password:password,
                phone_number:phoneNumber,
                address:address
                
        }).then((response) => {
                history.push('/login');
            }/* 
            else{
                setUsernamePassword("Invalid UserName And Password")
            } */
        );
        }
        
    }
    

    return(
        <div>
            <h1 className="login_register_heading">Register Page</h1>
                <center>
                    <form type="post">
                        <div className="seosaph_login">

                            <div className="input-group">
                                <input className="form-control mb-3" type="text" value={firstName} name="firstname" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} />
                                <input className="form-control mb-3" type="text" value={lastName} name="lastname" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}} />     
                            </div>
                            {userNameMessage}
                            <input className="form-control mb-3" type="text" value={userName} name="username" placeholder="User Name" onChange={(e) => {setUserName(e.target.value)}}/>
                            <input className="form-control mb-3" type="email" placeholder="Email Id" value={emailId} name="emailid" onChange={(e) => {setEmailId(e.target.value)}} required/>
                            <input className="form-control mb-3" type="password" placeholder="Password" value={password} name="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <input className="form-control mb-3" type="tel" placeholder="Phone Number" value={phoneNumber} name="phonenumber" pattern="[5-9]{1}[0-9]{9}" onChange={(e) => {setPhoneNumber(e.target.value)}} required/>
                            <input className="form-control mb-3" placeholder="Address" value={address} name="address" onChange={(e) => {setAddress(e.target.value)}} />
                           
                        </div>
                        <button className="myPost_button btn btn-outline-primary" onClick={submitRegister} >Register</button>
                </form>
                </center>
        </div>
    )
}

export default Reg
