import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
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
              return (
                <NavBars
                  email = {this.state.email}
                  logout = {() =>
                  {
                    this.setState({email: null});
                    this.props.history.replace('/');
                  }}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);