import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import './Existing.css'
import axios from '../axios';

class Existing extends Component
{
  state = {loading: true, data: null}

  removeHandler = (hash) =>
  {
    console.log(hash);
    this.setState({loading: true});
    axios.delete('/requests/' + hash + '.json');
  }

  render()
  {
    axios.get('/requests.json').then((res) =>
    {
      let data = res.data;

      if (data === null)
      {
        this.setState({loading: false});
      }
      else
      {
        Object.keys(data).map((e) =>
        {
          if (data[e].data.email !== this.props.data.email)
          {
            delete data[e];
          }
        });

        this.setState({loading: false, data: data});
      }
    });

    if (this.state.loading)
    {
      return (
        <div className = 'div2'>
          <CircularProgress />
        </div>
      );
    }
    else
    {
      if (this.state.data === null)
      {
        return (
          <div className = 'div2'>
            <h2> You have no existing travel requests. </h2>
          </div>
        );
      }
      else
      {
        return (
          <div id = 'top'>
            <h1> Active Requests </h1>
            {
              Object.keys(this.state.data).map((e) =>
              {
                const date = new Date(this.state.data[e].date);
      
                return (
                  <div key = {e}>
                    <div id = 'div2'>
                      <p> STARTING POINT: {this.state.data[e].start} </p>
                      <p> DESTINATION: {this.state.data[e].end} </p>
                      <p> MEANS OF TRANSPORTATION: {this.state.data[e].type} </p>
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