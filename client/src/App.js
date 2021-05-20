import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import mypost from './components/mypost';
import MySearch from './components/search';
import otherpost from './components/otherpost';
import Login from './components/login';
import Post from './components/post';
import {useHistory} from 'react-router-dom';
import { AuthContext } from './helpers/Auth';
import axios from 'axios';
import MyProfile from './components/myProfile';

function App() {
  const [authState, setAuthState]=useState(false);
  let history = useHistory()
  useEffect(() => {
    axios.get('http://localhost:3001/auth',{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then((response) => {
      console.log(response.data.length>0)
      if(response.data.length>0){
        setAuthState(true)
      }else{
        setAuthState(false)
      }
    })
  },[])
  const onLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/login')
  }
  return (
   <div className="App">
     <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className="navbar navbar-dark bg-dark ">  
            {authState && (
              <>
                <div>   
                    <Link className="link seosaph_home_homepage_navbar" to="/"> My Timeline</Link>
                    <Link className="link seosaph_home_navbar" to="/OtherPost">Other's TimeLine</Link>
                    <Link className="link seosaph_home_logout_navbar" to="/search">Search</Link>
                    <Link className="link seosaph_home_logout_navbar" to='/myprofile'>My Profile</Link>
                    <Link className="link seosaph_home_logout_navbar" onClick={onLogout}>Logout</Link>
                  </div>
              </>
            )}
            {!authState && (
              <>
                <div>   
                    <Link className="link seosaph_home_login_navbar" to="/login"> login</Link>
                  </div>
              </>
            )}
        </div>
        <Switch>
          <div>
          {!authState && (
              <>
                <Route path="/login" exact component={ Login } />
              </>
          )}
          {authState && (
            <>
            <Route path="/" exact component={ mypost } />
              <Route path="/otherpost" exact component= { otherpost } />
              <Route path="/post/:post_id" exact component= { Post } />
              <Route path="/search" exact component= { MySearch } />
              <Route path="/myprofile" exact component= { MyProfile } />
            </>
          )}
          </div>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
