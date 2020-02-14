import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/bootstrap/bootstrap.min.css';
import './App.css';

import HomePage from './pages/HomePage';
import CreateStoryPage from './pages/CreateStoryPage';

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/home" component={HomePage}/>
      <Route exact path="/create-story" component={CreateStoryPage}/>
    </Router>
  );
}

export default App;
