import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Login from './Login/Login';
import NavBars from './NavBars';

import './App.css';

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
