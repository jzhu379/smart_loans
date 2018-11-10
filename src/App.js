import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBars from './NavBars'
import './App.css';
import Login from './Login/Login';

class App extends Component
{
  state = {email: null};

  render()
  {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path = "/login"
            component = {(props) =>
            {
              return (
                <Login auth = {(email) => {this.setState({email: email});}} />
              );
            }}
          />
          <Route
            path = "*"
            component = {(props) =>
            {
              return (<NavBars email = {this.state.email} logout = {() => {this.setState({email: null});}}/>);
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;