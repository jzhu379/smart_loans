import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DatePicker} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';

import axios from 'axios';
import axiosUser from '../axios';
import './Login.css'

class Login extends Component 
{
  state =
  {
    name: '',
    email: '',
    pass1: '',
    pass2: '',
    showPass1: false,
    showPass2: false,
    emailLogin: '',
    passLogin: '',
    showPassLogin: false,
    loading: false,
    done: false,
    error1: null,
    error2: null,
    gender: '',
    birthday: new Date()
  };

  newUser = () =>
  {
    this.setState({loading: true});
    const data = {email: this.state.email, password: this.state.pass1, returnSecureToken: true}
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8bKYrM4J4NppYedW-Miv3-YuKB7OOaYE', data).then((res) =>
    {
      const user =
      {
        name: this.state.name,
        email: this.state.email,
        gender: this.state.gender,
        birthday: this.state.birthday
      };

      axiosUser.post('/users.json', user);
      this.setState({loading: false, done: true});
    }).catch((e) =>
    {
      this.setState({loading: false, error1: e.response.data.error.message});
    });
  }

  login = () =>
  {
    this.setState({loading: true});
    const data = {email: this.state.emailLogin, password: this.state.passLogin, returnSecureToken: true, name: this.state.name}
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8bKYrM4J4NppYedW-Miv3-YuKB7OOaYE', data).then((res) =>
    {
      let info = null;

      axiosUser.get('/users.json').then((res) =>
      {
        const data = res.data;
        for (const key of Object.keys(data))
        {
          if (data[key].email === this.state.emailLogin)
          {
            info = data[key];
            this.props.auth(info);
            this.props.history.replace('/');
            break;
          }
        }
      });
    }).catch((e) =>
    {
      this.setState({loading: false, error2: e.response.data.error.message});
    });
  }

  render()
  {
    const {classes} = this.props;

    let form = (
      <div>
        <div className = 'div'>
          <h1> Create New Account </h1>
          <TextField
            label = 'name'
            className = {classes.field}
            id = 'name'
            name = 'name'
            value = {this.state.name}
            onChange = {(event) => {this.setState({name: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'email'
            className = {classes.field}
            name = 'email'
            value = {this.state.email}
            onChange = {(event) => {this.setState({email: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            select
            label = 'gender'
            className = {classes.field1}
            value = {this.state.gender}
            onChange = {(event) =>
            {
              this.setState({gender: event.target.value});
            }}
          >
            {
              ['female', 'male', 'other'].map((e) =>
              {
                return (
                  <MenuItem
                    key = {e}
                    value = {e}
                    className = {classes.menuItem}
                  >
                    {e}
                  </MenuItem>
                );
              })
            }
          </TextField>
          <div className={classes.divider}/>
          <MuiPickersUtilsProvider utils = {MomentUtils}>
            <DatePicker
              value = {this.state.birthday}
              onChange = {(date) => {this.setState({birthday: date});}}
              label = "date of birth"
              openToYearSelection
              disableFuture
            />
          </MuiPickersUtilsProvider>
          <div className={classes.divider}/>
          <FormControl>
            <InputLabel htmlFor="adornment-password">password</InputLabel>
            <Input
              type = {this.state.showPass1 ? 'text' : 'password'}
              value = {this.state.pass1}
              onChange = {(event) => {this.setState({pass1: event.target.value});}}
              endAdornment = {
                <InputAdornment position="end">
                  <IconButton
                    aria-label = "Toggle password visibility"
                    onClick={() => {this.setState({showPass1: !this.state.showPass1});}}
                  >
                    {this.state.showPass1 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.divider}/>
          <FormControl>
            <InputLabel htmlFor="adornment-password">confirm password</InputLabel>
            <Input
              type = {this.state.showPass2 ? 'text' : 'password'}
              value = {this.state.pass2}
              onChange = {(event) => {this.setState({pass2: event.target.value});}}
              endAdornment = {
                <InputAdornment position="end">
                  <IconButton
                    aria-label = "Toggle password visibility"
                    onClick={() => {this.setState({showPass2: !this.state.showPass2});}}
                  >
                    {this.state.showPass2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className = {classes.divider}/>
          <Button
            variant = 'contained'
            classes = {{label: classes.label, root: classes.btn2}}
            onClick = {() =>
            {
              if (this.state.pass1 === '' || this.state.pass2 === '' || this.state.name === '' || this.state.email === '')
              {
                alert('Missing information!');
              }
              else if (this.state.pass1 !== this.state.pass2)
              {
                alert('Passwords do not match!');
              }
              else
              {
                this.newUser();
              }
            }}
          >
            CREATE
          </Button>
        </div>
        <div id = 'middle'/>
        <div className = 'div2'>
          <h1> Login </h1>
          <div className={classes.divider}/>
          <TextField
            label = 'email'
            className = {classes.field}
            id = 'email'
            name = 'email'
            value = {this.state.emailLogin}
            onChange = {(event) => {this.setState({emailLogin: event.target.value});}}
          />
          <div className={classes.divider}/>
          <FormControl>
            <InputLabel htmlFor="adornment-password">password</InputLabel>
            <Input
              type = {this.state.showPassLogin ? 'text' : 'password'}
              value = {this.state.passLogin}
              onChange = {(event) => {this.setState({passLogin: event.target.value});}}
              endAdornment = {
                <InputAdornment position="end">
                  <IconButton
                    aria-label = "Toggle password visibility"
                    onClick={() => {this.setState({showPassLogin: !this.state.showPassLogin});}}
                  >
                    {this.state.showPassLogin ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className = {classes.divider}/>
          <Button
            variant = 'contained'
            classes = {{label: classes.label, root: classes.btn2}}
            onClick = {() =>
            {
              if (this.state.emailLogin === '' || this.state.passLogin === '')
              {
                alert("Missing data!");
              }
              else
              {
                this.login();
              }
            }}
          >
            LOGIN
          </Button>
        </div>
      </div>
    );

    if (this.state.loading)
    {
      form = (<CircularProgress classes = {{root: classes.spinner, colorPrimary: classes.spinnerColor}} color = 'primary' thickness = {8} size = {100}/>);
    }

    if (this.state.error1 !== null)
    {
      let msg = 'Something went wrong';

      if (this.state.error1 === 'INVALID_EMAIL')
      {
        msg = 'Invalid email.'
      }

      if (this.state.error1 === 'WEAK_PASSWORD : Password should be at least 6 characters')
      {
        msg = 'Password should be at least 6 characters.';
      }

      if (this.state.error1 === 'EMAIL_EXISTS')
      {
        msg = 'Email already has account.'
      }

      form = (
        <div id = 'form1'>
          <h1> {msg} </h1>
          <Button
            variant = 'contained'
            classes = {{label: classes.label, root: classes.btn2}}
            onClick = {() =>
            {
              this.setState({
                name: '',
                email: '',
                pass1: '',
                pass2: '',
                showPass1: false,
                showPass2: false,
                emailLogin: '',
                passLogin: '',
                showPassLogin: false,
                loading: false,
                done: false,
                error1: null,
                error2: null,
                gender: '',
                birthday: new Date()
              });
            }}
          >
            TRY AGAIN?
          </Button>
        </div>
      );
    }

    if (this.state.error2 !== null)
    {
      let msg = 'Something went wrong';

      if (this.state.error2 === 'INVALID_EMAIL' || this.state.error2 === 'INVALID_PASSWORD')
      {
        msg = 'Invalid email or password.'
      }

      if (this.state.error2 === 'EMAIL_NOT_FOUND')
      {
        msg = 'Email has no linked account.'
      }

      form = (
        <div id = 'form1'>
          <h1>{msg}</h1>
          <Button
            variant = 'contained'
            classes = {{label: classes.label, root: classes.btn2}}
            onClick = {() =>
            {
              this.setState({
                name: '',
                email: '',
                pass1: '',
                pass2: '',
                showPass1: false,
                showPass2: false,
                emailLogin: '',
                passLogin: '',
                showPassLogin: false,
                loading: false,
                done: false,
                error1: null,
                error2: null,
                gender: '',
                birthday: new Date()
              });
            }}
          >
            TRY AGAIN?
          </Button>
        </div>
      );
    }

    if (this.state.done)
    {
      form = (
        <div className = 'div'>
          <h1> Account created successfully. </h1>
        </div>
      );
    }

    return (
      <div>
        <Button
          variant = 'contained'
          classes = {{label: classes.label, root: classes.btn}}
          onClick = {() =>
          {
            this.props.history.replace('/');
          }}
        >
          BACK TO HOME
        </Button>
        <div className = {classes.div}/>
        {form}
      </div>
    );
  }
};

const styles =
{
  btn:
  {
    backgroundColor: 'rgba(61, 133, 209, 1)',
    padding: '1rem',
    top: '5vh'
  },
  btn2: {backgroundColor: 'rgba(61, 133, 209, 1)',},
  label: {fontSize: '1.2rem'},
  field: {width: '20rem'},
  field1: {width: '10rem'},
  divider: {height: '1rem'},
  spinner:
  {
    position: 'fixed',
    top: '50%'
  },
  spinnerColor: {color: '#40e0d0'}
};


export default withStyles(styles)(withRouter(Login));