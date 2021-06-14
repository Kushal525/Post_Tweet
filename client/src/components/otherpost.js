import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

function OtherPost() {
    const [myPostList, setMyPostList ] = useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get('http://localhost:3001/otherpost',{
          headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response) => {
          setMyPostList(response.data)
        })
      }, []);
    return (
      <div className="App">
        <h1>Other Posts</h1>
        { myPostList.map((val) => {
        return(
            <center>
              <div className="card-group seosaph_mypost_post">
                <div className="card" onClick={() => {history.push(`/post/${val.post_id}`)}}>
                        <h4 className="card-title seosaph_mypost_title">{val.user_name}</h4>
                        <p className="card-body">{val.text_post} </p>
                    
                    <div className="seosaph_mypost_footer">
                        <p>{val.post_time}</p>
                    </div>
                </div>
              </div>
          </center>
        );
      })}
      </div>
      
    );
  }
  
export default OtherPost;