import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import NavBars from './NavBars'
import './App.css';
import Login from './Login/Login';

class App extends Component {
  state = {data: null};

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path = "/login"
            component = {() => {
              return (
                <Login auth = {(data) => { this.setState({data: data}); }}/>
              );
            }}
          />
          <Route
            path = "*"
            component = {() => {
              return (
                <NavBars
                  data = {this.state.data}
                  logout = {() => {
                    this.setState({data: null});
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