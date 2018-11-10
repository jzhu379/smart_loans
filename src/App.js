import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBars from './NavBars'
import './App.css';
import Login from './Login/Login';

class App extends Component
{
  render()
  {
    return (
      <div className="App">
        <Switch>
          <Route exact path = "/login" component = {Login}/>
          <Route path = "*" component = {NavBars} />
        </Switch>
      </div>
    );
  }
}

export default App;