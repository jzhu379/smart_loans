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
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import axiosUser from '../axios';
import './Login.css'

class Login extends Component 
{
  state =
  {
    first_name: '',
    last_name: '',
    email: '',
    pass1: '',
    pass2: '',
    street_number: '',
    street_name: '',
    city: '',
    state: '',
    zip: '',
    showPass1: false,
    showPass2: false,
    emailLogin: '',
    passLogin: '',
    showPassLogin: false,
    loading: false,
    done: false,
    error1: null,
    error2: null,
  };

  newUser = () =>
  {
    this.setState({loading: true});
    const data = {email: this.state.email, password: this.state.pass1, returnSecureToken: true}
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8bKYrM4J4NppYedW-Miv3-YuKB7OOaYE', data).then((res) =>
    {
      const user =
      {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        address:
        {
          street_number: this.state.street_number,
          street_name: this.state.street_name,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
        }
      };
      axios.post('http://api.reimaginebanking.com/customers?key=925b21efc47b46165d21b9eacc69824a', user).catch(e => {
        this.setState({loading: false, error1: e.response.data.error.message});
      }).then(res => {
        axiosUser.post('/users.json', {...user, email: this.state.email, _id: res.data.objectCreated._id});
      });
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
            label = 'first name'
            className = {classes.field}
            id = 'first_name'
            name = 'first_name'
            value = {this.state.first_name}
            onChange = {(event) => {this.setState({first_name: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'last name'
            className = {classes.field}
            id = 'last_name'
            name = 'last_name'
            value = {this.state.last_name}
            onChange = {(event) => {this.setState({last_name: event.target.value});}}
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
          <h3> Address: </h3>
          <TextField
            label = 'street number'
            className = {classes.field}
            id = 'street_number'
            name = 'street_number'
            value = {this.state.street_number}
            onChange = {(event) => {this.setState({street_number: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'street name'
            className = {classes.field}
            id = 'street_name'
            name = 'street_name'
            value = {this.state.street_name}
            onChange = {(event) => {this.setState({street_name: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'city'
            className = {classes.field}
            id = 'city'
            name = 'city'
            value = {this.state.city}
            onChange = {(event) => {this.setState({city: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'state'
            className = {classes.field}
            id = 'state'
            name = 'state'
            value = {this.state.state}
            onChange = {(event) => {this.setState({state: event.target.value});}}
          />
          <div className={classes.divider}/>
          <TextField
            label = 'zip'
            className = {classes.field}
            id = 'zip'
            name = 'zip'
            value = {this.state.zip}
            onChange = {(event) => {this.setState({zip: event.target.value});}}
          />
          <div className={classes.divider}/>
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
                first_name: '',
                last_name: '',
                email: '',
                pass1: '',
                pass2: '',
                street_number: '',
                street_name: '',
                city: '',
                state: '',
                zip: '',
                showPass1: false,
                showPass2: false,
                emailLogin: '',
                passLogin: '',
                showPassLogin: false,
                loading: false,
                done: false,
                error1: null,
                error2: null,
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
                first_name: '',
                last_name: '',
                email: '',
                pass1: '',
                pass2: '',
                street_number: '',
                street_name: '',
                city: '',
                state: '',
                zip: '',
                showPass1: false,
                showPass2: false,
                emailLogin: '',
                passLogin: '',
                showPassLogin: false,
                loading: false,
                done: false,
                error1: null,
                error2: null,
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