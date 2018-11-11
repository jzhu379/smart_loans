import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../axios';
import './Search.css'

class Search extends Component 
{
  state =
  {
    start: '',
    end: '',
    loading: false,
    results: null,
    error: false,
    empty: false
  }

  getData = () =>
  {
    this.setState({loading: true, results: null, error: false, empty: false});
    axios.get('https://hackprinceton-9b98d.firebaseio.com/requests.json').then((res) =>
    {
      let data = res.data;

      if (data === null)
      {
        this.setState({empty: true});
      }
      else
      {
        Object.keys(data).map((e) =>
        {
          if (data[e].start !== this.state.start || data[e].end !== this.state.end || data[e].data.email === this.props.data.email)
          {
            delete data[e];
          }
        });

        this.setState({loading: false});
        this.setState({results: data});
      }
    }).catch((e) =>
    {
      this.setState({loading: false});
      this.setState({error: true});
    });
  }

  render()
  {
    const {classes} = this.props;

    let display = null;

    if (this.state.loading)
    {
      display = (<CircularProgress/>);
    }

    if (this.state.empty)
    {
      display = (
        <div className = {classes.entry}>
          <p> No results found. </p>
        </div>
      );
    }

    if (this.state.error)
    {
      display = (
        <div className = {classes.entry}>
          <h2> Sorry, an error occured. </h2>
        </div>
      );
    }

    if (this.state.results !== null)
    {
      if (Object.keys(this.state.results).length === 0)
      {
        display = (
          <div className = {classes.entry}>
            <p> No results found. </p>
          </div>
        );
      }
      else
      {
        display = Object.keys(this.state.results).map((e) =>
        {
          const date = new Date(this.state.results[e].date);

          return (
            <div className = {classes.entry} key = {e}>
              <p> CONTACT: {this.state.results[e].data.email} </p>
              <p> GENDER: {this.state.results[e].data.gender} </p>
              <p> MEANS OF TRANSPORTATION: {this.state.results[e].type} </p>
              <p> AGE: {getAge(this.state.results[e].data.birthday)} </p>
              <p> STARTING POINT: {this.state.results[e].start} </p>
              <p> DESTINATION: {this.state.results[e].end} </p>
              <p> DATE: {monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()} </p>
              <p> TIME: {formatTime(date.getHours(), date.getMinutes())} </p>
            </div>
          );
        });
      }
    }

    return (
      <div>
        <div className = 'form'>
          <h1> Search Travel Requests </h1>
          <TextField
            label = 'start location'
            className = {classes.field}
            id = 'start'
            name = 'start'
            value = {this.state.start}
            onChange = {(event) => {this.setState({start: event.target.value});}}
          />

          <div className = {classes.divider}/>

          <TextField
            label = 'destination'
            className = {classes.field}
            id = 'end'
            name = 'end'
            value = {this.state.end}
            onChange = {(event) => {this.setState({end: event.target.value});}}
          />

          <div className = {classes.divider}/>

          <Button
            variant = 'contained'
            color = 'primary'
            onClick = {(e) =>
            {
              e.preventDefault();
              this.getData();
            }}
          >
            SEARCH
          </Button>
        </div>

        <div className = {classes.divider}/>

        {display}
      </div>
    );
  }
}

const formatTime = (hours, minutes) =>
{
  if (minutes === 0)
  {
    minutes = '00';
  }
  else if (minutes < 10)
  {
    minutes = '0' + minutes;
  }

  let str = '';
  if (hours > 12)
  {
    hours -= 12;
    str += 'PM';
  }
  else if (hours === 12)
  {
    str += 'PM';
  }
  else if (hours === 0)
  {
    hours = 12;
    str += 'AM';
  }
  else
  {
    str += 'AM';
  }

  return hours + ':' + minutes + ' '+ str;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getAge = (dateString) =>
{
  let today = new Date();
  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
  {
    age--;
  }
  return age;
}

const styles = () =>
{
  return (
  {
    field: {width: '40rem'},
    divider: {height: '1rem'},
    entry:
    {
      backgroundColor: 'lightblue',
      borderRadius: '1rem',
      width: '30%',
      margin: 'auto',
      padding: '0.5rem',
      marginTop: '0.5rem',
      marginBottom: '0.5rem'
    }
  })
}

export default withStyles(styles)(Search);