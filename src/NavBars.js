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
import Search from './Search/Search';
import About from './About/About';

class NavBars extends Component
{
  state = {showing: false}

  render()
  {
    const {classes} = this.props;

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
              <ListItemText classes = {{primary: classes.text}} primary = "Submit Request" />
            </ListItem>
            <ListItem classes = {{root: classes.container}} button component = {Link}  to = "/search">
              <ListItemText classes = {{primary: classes.text}} primary = "Search Requests" />
            </ListItem>
            <ListItem classes = {{root: classes.container}} button component = {Link}  to = "/about">
              <ListItemText classes = {{primary: classes.text}} primary = "About Me" />
            </ListItem>
          </div>
        </SwipeableDrawer>

        <AppBar classes = {{root: classes.rootBar}} position = "static">
          <Toolbar classes = {{root: classes.bar}}>
            <IconButton
              className = {classes.menuButton}
              color = "inherit"
              aria-label = "Menu"
              onClick = {() =>
              {
                this.setState({showing: true});
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className = {classes.grow} classes = {{root: classes.title}}>
              TRAVEL TOGETHER
            </Typography>
            <Button
              variant = 'contained'
              classes = {{label: classes.label, root: classes.btn}}
              onClick = {() =>
              {
                this.props.history.push('./login');
              }}
            >
              LOGIN
            </Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/submit" component = {Submit}/>
          <Route exact path = "/search" component = {Search}/>
          <Route exact path = "/about" component = {About}/>
          <Route path = "*" component = {Home} />
        </Switch>
      </div>
    );
  }
}

const styles =
{
  root: {flexGrow: 1},
  grow: {flexGrow: 1, color: 'rgba(255, 90, 54)', fontWeight: 'bold'},
  list: {position: 'relative', width: '15rem'},
  drawer: {backgroundColor: 'rgba(61, 133, 209, 1)'},
  btn: {backgroundColor: 'rgba(61, 133, 209, 1)', padding: '1rem'},
  container: {height: '7rem'},
  text: {fontSize: '1.4rem'},
  title: {fontSize: '2.2rem'},
  bar: {height: '15vh'},
  rootBar: {backgroundColor: 'rgba(61, 81, 181, 0.8)'},
  label: {fontSize: '1.2rem'},
};

export default withStyles(styles)(withRouter(NavBars));