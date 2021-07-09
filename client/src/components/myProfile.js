import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import avatar from './avatar.jpg';

const MyProfile = () => {
    const [totalNumberOfPost, setTotalNumberOfPost] = useState([]);
    const [totalNumberOfLikes, setTotalNumberOfLikes] = useState([]);
    const [totalNumberOfDisLikes, setTotalNumberOfDisLikes] = useState([]);
    const [myProfile, setMyProfile] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:3001/myprofile/posts',{
            headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response)=>{
          setTotalNumberOfPost(response.data)
     })
    })

    useEffect(()=>{
        Axios.get('http://localhost:3001/myprofile/likes',{
            headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response)=>{
          setTotalNumberOfLikes(response.data)
     })
    })

    useEffect(()=>{
        Axios.get('http://localhost:3001/myprofile/dislikes',{
            headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response)=>{
          setTotalNumberOfDisLikes(response.data)
     })
    })

    useEffect(()=>{
        Axios.get('http://localhost:3001/myprofile',{
            headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response)=>{
            setMyProfile(response.data)
        })
    })
    return(
        <div>
            {myProfile.map((val)=>{
                return(
                    <center>
                    <div className="seasaph_myprofile">
                        <div>
                            <img className="seosaph_myprofile_pic" src={avatar} alt="Profile"/>
                        </div>
                        <h3>{val.user_name}</h3>
                        <h3>First Name : {val.first_name}</h3>
                        <h3>Last Name : {val.last_name}</h3>
                        <h3>Email Id : {val.email_id}</h3>
                        <h3>Phone Number : {val.phone_number}</h3>
                        <h3>Address{val.address}</h3>
                        <hr/>
                        <div className="seosaph_myprofile_bottom">
                            <div>
                                <div>
                                    <h1>Posts</h1>
                                    {totalNumberOfPost.map((val) => {
                                        return(
                                            <h3>{val.totalpost}</h3>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>Likes</h1>
                                    {totalNumberOfLikes.map((val) => {
                                        return(
                                            <h3>{val.totallikes}</h3>
                                        )
                                    })}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>DisLikes</h1>
                                    {totalNumberOfDisLikes.map((val) => {
                                        return(
                                            <h3>{val.totaldislikes}</h3>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>
                )
            })}
        </div>
    )
}

export default MyProfile;