import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import mypost from './components/mypost';
import otherpost from './components/otherpost';
import Login from './components/login';
import Post from './components/post';
import {useHistory} from 'react-router-dom';

function App() {
  let history = useHistory()
  const onLogout = () => {
    localStorage.removeItem('accessToken');
    history.push('/login')
    
  }
  return (
   <div className="App">
      <Router>
        <div className="navbar navbar-dark bg-dark ">  
            {localStorage.getItem("accessToken") && (
              <>
                <div>   
                    <Link className="link seosaph_home_homepage_navbar" to="/"> My Timeline</Link>
                    <Link className="link seosaph_home_navbar" to="/OtherPost">Other's TimeLine</Link>
                    <Link className="link seosaph_home_logout_navbar" onClick={onLogout}>Logout</Link>
                  </div>
              </>
            )}
        </div>
        <Switch>
          <div>
          {!localStorage.getItem("accessToken") && (
              <>
                <Route path="/" exact component={ Login } />
              </>
          )}
          {localStorage.getItem("accessToken") && (
            <>
            <Route path="/" exact component={ mypost } />
              <Route path="/otherpost" exact component= { otherpost } />
              <Route path="/post/:post_id" exact component= { Post } />
            </>
          )}
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
