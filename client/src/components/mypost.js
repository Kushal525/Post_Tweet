import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import Axios from 'axios';
import '../App.css';  

function MyPost() {
    const [ newPost, setNewPost ] = useState('');
    const [myPostList, setMyPostList ] = useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get('http://localhost:3001/mypost',{
          headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        }).then((response) => {
          setMyPostList(response.data)
        })
      }, []);

      const onSubmitPost = () => {
        if(!newPost){
          return alert("Can't Post Empty Data");
        }

        Axios.post('http://localhost:3001/insertpost',{
          text_post:newPost
        },{
          headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        })
      };
    

    return (
      <div className="App">
        <h1>New Posts</h1>
          <form>
            <div className="form-floating mb-3">
              <textarea className="myPost_Post" placeholder="Enter Your Post" name="text_post" autoComplete="off" onChange={(e) => setNewPost(e.target.value)} ></textarea><br/>
              <button className="myPost_button btn btn-outline-primary" onClick={onSubmitPost} >Post</button>
            </div>
          </form>
        <h1>My Post</h1>
        { myPostList.map((val) => {
        return(
          <center>
            <div className="card-group seosaph_mypost_post">
            <div className="card" onClick={() => {history.push(`/post/${val.post_id}`)}}>
                    <h4 className="card-title seosaph_mypost_title">{val.user_name}</h4>
                    <p className="card-body seosaph_mypost_body">{val.text_post} </p>
                
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
  
export default MyPost;