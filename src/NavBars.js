import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {Switch, Route, Link, withRouter} from 'react-router-dom';

import Home from './Home/Home';
import Submit from './Submit/Submit';
import Loan from './Loan/Loan';

/* master branch */
class NavBars extends Component {
  state = {
    showing: false,
    loading: false,
    data: null,
    finished: false,
  }

  render() {
    const {classes} = this.props;

    if (this.props.data === null) {
      return (
        <div className = {classes.root} id = "background">
          <AppBar className = {classes.root} classes = {{root: classes.rootBar}} position = "static">
            <Toolbar classes = {{root: classes.bar}}>
              <Typography variant="h6" color="inherit" className = {classes.grow} classes = {{root: classes.title}}>
                CapitalOne
              </Typography>
              <Button
                variant = 'contained'
                classes = {{label: classes.label, root: classes.btn}}
                onClick = {() => {
                  this.props.history.push('./login');
                }}
              >
                LOGIN | SIGN UP
              </Button>
            </Toolbar>
          </AppBar>
  
          <Switch>
            <Route exact path = "/" render = {() => { return <Home data = {this.props.data}/>; }}/>
            <Route path = "*" render = {() => { return <Home data = {this.props.data}/>; }}/>
          </Switch>
        </div>
      );
    }
    else {
      return (
        <div className = {classes.root} id = "background">
          <SwipeableDrawer
            classes = {{paper: classes.drawer}}
            open = {this.state.showing}
            onClose = {() => {
              this.setState({showing: false});
            }}
            onOpen = {() => {
              this.setState({showing: true});
            }}
          >
            <div
              tabIndex = {0}
              role = "button"
              className = {classes.list}
              onClick = {() => {
                this.setState({showing: false});
              }}
              onKeyDown = {() => {
                this.setState({showing: true});
              }}
            >
              <ListItem classes = {{root: classes.container}} button component = {Link}  to = "/">
                <ListItemText classes = {{primary: classes.text}} primary = "Home" />
              </ListItem >
              <ListItem classes = {{root: classes.container}} button component = {Link} to = "/submit">
                <ListItemText classes = {{primary: classes.text}} primary = "Submit Account Request" />
              </ListItem>
              <ListItem classes = {{root: classes.container}} button component = {Link} to = "/loan">
                <ListItemText classes = {{primary: classes.text}} primary = "Loan Calculations" />
              </ListItem>
            </div>
          </SwipeableDrawer>
  
          <AppBar className = {classes.root} classes = {{root: classes.rootBar}} position = "static">
            <Toolbar classes = {{root: classes.bar}} className = {classes.root} position="static">
              <IconButton
                className = {classes.menuButton}
                color = "inherit"
                aria-label = "Menu"
                onClick = {() => {
                  this.setState({showing: true});
                }}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" color="inherit" className = {classes.grow} classes = {{root: classes.title}}>
                CapitalOne
              </Typography>
              <Typography variant="h6" color="inherit" className = {classes.grow1}>
                {this.props.data.email}
              </Typography>
              <Button
                variant = 'contained'
                classes = {{label: classes.label, root: classes.btn}}
                onClick = {this.props.logout}
              >
                LOGOUT
              </Button>
            </Toolbar>
          </AppBar>
  
          <Switch>
            <Route exact path = "/" render = {() => { return (<Home data = {this.props.data}/>); }}/>
            <Route exact path = "/submit" render = {() => { return (<Submit data = {this.props.data}/>); }}/>
            <Route exact path = "/loan" render = {() => { return (<Loan data = {this.props.data}/>); }}/>
            <Route path = "*" render = {() => { return <Home data = {this.props.data}/>; }}/>
          </Switch>
        </div>
      );
    }
  }
}

const styles =
{
  root: {flexGrow: 1},
  grow: {flexGrow: 1, color: 'rgba(255, 90, 54)', fontWeight: 'bold'},
  grow1: {paddingRight: '1rem', color: 'rgba(255, 90, 54)'},
  list: {position: 'relative', width: '15rem'},
  drawer: {backgroundColor: 'rgba(61, 133, 209, 1)'},
  btn: {backgroundColor: 'rgba(61, 133, 209, 1)', padding: '1rem'},
  container: {height: '7rem'},
  text: {fontSize: '1.4rem'},
  title: {fontSize: '2.2rem', margin: 'auto', paddingLeft: '1.2rem'},
  bar: {height: '15vh', textAlign: 'left'},
  rootBar: {backgroundColor: 'rgba(61, 81, 181, 0.45)'},
  label: {fontSize: '1.2rem'},
  spinner:
  {
    position: 'fixed',
    top: '50%'
  },
  spinnerColor: {color: '#40e0d0'},
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  }
};

export default withStyles(styles)(withRouter(NavBars));
