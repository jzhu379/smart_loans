import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import './Existing.css'
import axios from '../axios';

class Existing extends Component
{
  state = {loading: true}

  removeHandler = (hash) =>
  {
    console.log(hash);
    this.setState({loading: true});
    axios.delete('/requests/' + hash + '.json');
  }

  render()
  {
    if (this.props.requests === null || Object.keys(this.props.requests).length === 0)
    {
      return (
        <div id = 'top'>
          <h1> No active requests. </h1>
        </div>
      );
    }
    else
    {
      return (
        <div id = 'top'>
          <h1> Active Requests </h1>
          {
            Object.keys(this.props.requests).map((e) =>
            {
              const date = new Date(this.props.requests[e].date);
    
              return (
                <div key = {e}>
                  <div id = 'div2'>
                    <p> STARTING POINT: {this.props.requests[e].start} </p>
                    <p> DESTINATION: {this.props.requests[e].end} </p>
                    <p> MEANS OF TRANSPORTATION: {this.props.requests[e].type} </p>
                    <p> DATE: {monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()} </p>
                    <p> TIME: {formatTime(date.getHours(), date.getMinutes())} </p>
                    <Button
                      variant = 'contained'
                      color = 'primary'
                      onClick = {() =>
                      {
                        this.removeHandler(e);
                      }}
                    >
                      DELETE
                    </Button>
                  </div>
                  <div id = 'divider'/>
                </div>
              );
            })
          }
        </div>
      );
    }
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

export default Existing;