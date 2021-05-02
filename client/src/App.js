import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import mypost from './components/mypost';
import otherpost from './components/otherpost';
import Login from './components/login';
import Post from './components/post';

function App() {
  return (
   <div className="App">
      <Router>
        <div className="navbar navbar-dark bg-dark">
          <Link className="link" to="/"> Home Page</Link>
          <Link className="link" to="/login"> Login </Link>
          <Link className="link" to="/MyPost"> My Timeline</Link>
          <Link className="link" to="/OtherPost">Other's TimeLine</Link>
        </div>
        <Switch>
          <Route path="/mypost" exact component={ mypost } />
          <Route path="/login" exact component={ Login } />
          <Route path="/otherpost" exact component= { otherpost } />
          <Route path="/post/:post_id" exact component= { Post } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
