import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import mypost from './components/mypost';
import otherpost from './components/otherpost';
import Login from './components/login';
import Register from './components/register';
import Reg from './components/reg';
import Post from './components/post';
import { AuthContext } from './helpers/Auth';
import axios from 'axios';
import MyProfile from './components/myProfile';
//import MySearch from './components/search';
//import Add from './components/new'
//import ClassExample from './components/ClassExample'


function App() {
  const [authState, setAuthState]=useState(false);
  useEffect(() => {
    axios.get('http://localhost:3001/auth',{
      headers:{
        accessToken:localStorage.getItem("accessToken")
      }
    }).then((response) => {
      if(response.data.length>0){
        setAuthState(true)
      }else{
        setAuthState(false)
      }
    })
  },[])
  const onLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.assign("/login")
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
                    {/* <Link className="link seosaph_home_logout_navbar" to="/search">Search</Link> */}
                    <Link className="link seosaph_home_logout_navbar" to='/myprofile'>My Profile</Link>
                    <Link className="link seosaph_home_logout_navbar" to="/login" onClick={onLogout}>Logout</Link>
                    {/* <Link className="link seosaph_home_logout_navbar" to="add">Add</Link>
                    <Link className="link seosaph_home_logout_navbar" to="classexample">ClassComponent</Link> */}
                  </div>
              </>
            )}
            {!authState && (
              <>
                <div>   
                    <Link className="link seosaph_home_login_navbar" to="/login"> login</Link>
                    <Link className="link seosaph_home_login_navbar" to="/register"> Register</Link>
                  </div>
              </>
            )}
        </div>
        <Switch>
        <React.Fragment>
          <div>
          {!authState && (
              <>
                <Route path="/login" exact component={ Login } />
                <Route path="/register" exact component={ Register } />
              </>
          )}
          {authState && (
            <>
            <Route path="/" exact component={ mypost } />
              <Route path="/otherpost" exact component= { otherpost } />
              <Route path="/post/:post_id" exact component= { Post } />
              <Route path="/myprofile" exact component= { MyProfile } />
              {/* <Route path="/search" exact component= { MySearch } />
              <Route path="/add" exact component= {Add} />
              <Route path="/classexample" exact component= {ClassExample} /> */}
              
            </>
          )}
          </div>
          </React.Fragment>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
