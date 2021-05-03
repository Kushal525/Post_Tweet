import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import '../App.css';  

function Post() {               
    let {post_id} = useParams();
    const [myPostList, setMyPostList ] = useState([]);
    const [postComment, setComment ] = useState([]);
    const [newPostComment, setNewPostComment ] = useState('');
    const [showLikes, setPostLikes ] = useState([]);
    const [showDisLikes, setPostDisLikes ] = useState([]);

    const onSubmitPostLikes = () => {
      Axios.post(`http://localhost:3001/likes/${post_id}`,{
        accessToken:localStorage.getItem("accessToken")
      })
      };

    const onSubmitPostDisLikes = () => {
      Axios.post(`http://localhost:3001/dislikes/${post_id}`,{
        accessToken:localStorage.getItem("accessToken")
      })
      };

    useEffect(() => {
        Axios.get(`http://localhost:3001/post/${post_id}`).then((response) => {
          setMyPostList(response.data)
        })
      });

      useEffect(() => {
        Axios.get(`http://localhost:3001/comment/${post_id}`).then((response) => {
          setComment(response.data)
        })
      });

      useEffect(() => {
        Axios.get(`http://localhost:3001/likes/${post_id}`).then((response) => {
          setPostLikes(response.data)
        })
      });

      useEffect(() => {
        Axios.get(`http://localhost:3001/dislikes/${post_id}`).then((response) => {
          setPostDisLikes(response.data)
        })
      });
      const onSubmitPostComment = () => {
        if(!newPostComment){
          return alert("Can't Post Empty Comment");
        }

        Axios.post(`http://localhost:3001/insertcomment/${post_id}`,{
          post_comment:newPostComment
        },{
          headers:{
            accessToken:localStorage.getItem("accessToken")
          }
        })
        setNewPostComment('');
      };

    return (
      <div className="App seosaph_post">
        <div>
          { myPostList.map((val) => {
          return(
            <center>
              <div>
                <div className="card-group seosaph_post_post post_column">
                  <div className="card">
                          <h4 className="card-title seosaph_post_title">{val.user_name}</h4>
                          <p className="card-body">{val.text_post} </p>
                      
                      <div className="seosaph_post_footer">
                          <p>{val.post_time}</p>
                      </div>
                  </div>
                </div>
                
                <div className="d-flex flex-row seosaph_post_likes_dislikes">
                  <div className="p-2">
                      <button className="seosaph_post_like" onClick={onSubmitPostLikes} ><AiFillLike size="3em" /></button>                      
                      {showLikes.map((val) =>{
                      return(
                        <div>
                        <h1>{val.likes}</h1>
                        </div>
                      )
                      } )}
                  </div>
                  <div className="p-2">
                    <button className="seosaph_post_like" onClick={onSubmitPostDisLikes} ><AiFillDislike size="3em" /></button>          
                    {showDisLikes.map((val) =>{
                    return(
                      <div>
                      <h1>{val.dislikes}</h1>
                      </div>
                    )
                    } )}
                  </div>
                </div>
              </div>
            </center>
          );
        })}
        </div>
        <div className="post_column right">
          <div className="seosaph_post_comment">
            <form>
              <textarea className="seosaph_post_comment_input" value={newPostComment} type="text" name="comment" onChange={(e) => {setNewPostComment(e.target.value)}} ></textarea><br/>
              <button className="myPost_button btn btn-outline-primary" onClick={onSubmitPostComment} >Post</button>
            </form>
          </div>
        <h1>comment</h1>
        <center>
        { postComment.map((val) => { 
          return(
            <div className="seosaph_comment">
              <h6>{val.user_name}</h6>
              <p>{val.post_comment}</p>
              <h6>{val.comment_time}</h6>
            </div>
          )
         })};
         </center>
        </div>
      </div>
    );
  }
  
export default Post;