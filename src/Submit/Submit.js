import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DateTimePicker} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import './Submit.css';
import axios from '../axios';

class Submit extends Component 
{
  state =
  {
    start: '',
    end: '',
    date: null,
    loading: false,
    error: false,
    success: false
  }

  sendData = () =>
  {
    const data =
    {
      start: this.state.start,
      end: this.state.end,
      date: this.state.date
    };

    this.setState({loading: true});
    axios.post('/requests.json', data).then((res) =>
    {
      this.setState({loading: false});
      this.setState({success: true});
    }).catch((e) =>
    {
      this.setState({loading: false});
      this.setState({error: true});
    });
  }

  reset = () =>
  {
    this.setState({error: false, success: false, start: '', end: '', date: null});
  }

  render()
  {
    const {classes} = this.props;

    let a = new Date();
    a.setDate(a.getDate() + 2);

    let display = (
      <div>
        <h1> Submit Travel Request </h1>
        <TextField
          label = 'Start Location'
          className = {classes.field}
          id = 'start'
          name = 'start'
          value = {this.state.start}
          onChange = {(event) => {this.setState({start: event.target.value});}}
        />

        <div className = {classes.divider}/>

        <TextField
          label = 'Destination'
          className = {classes.field}
          id = 'end'
          name = 'end'
          value = {this.state.end}
          onChange = {(event) => {this.setState({end: event.target.value});}}
        />

        <div className = {classes.divider}/>

        <MuiPickersUtilsProvider utils = {MomentUtils}>
          <DateTimePicker
            value = {this.state.date}
            onChange = {(date) => {this.setState({date: date});}}
            label = "Time of Departure"
            minDate = {a}
          />
        </MuiPickersUtilsProvider>

        <div className = {classes.divider}/>

        <Button
          variant = 'contained'
          color = 'primary'
          onClick = {(e) =>
          {
            e.preventDefault();
            this.sendData();
          }}
        >
          SEND
        </Button>
      </div>
    );

    if (this.state.loading)
    {
      display = (<CircularProgress/>);
    }

    if (this.state.error)
    {
      display = (
        <div>
          <h2> Sorry, an error occured. </h2>
          <Button
            variant = 'contained'
            color = 'primary'
            onClick = {(e) =>
            {
              e.preventDefault();
              this.reset();
            }}
          >
            TRY AGAIN?
          </Button>
        </div>
      );
    }
    
    if (this.state.success)
    {
      display = (
        <div>
          <h2> Submission successful. </h2>
          <Button
            variant = 'contained'
            color = 'primary'
            onClick = {(e) =>
            {
              e.preventDefault();
              this.reset();
            }}
          >
            SUBMIT ANOTHER FORM?
          </Button>
        </div>
      );
    }

    return (
      <div className = 'form'>
        {display}
      </div>
    );
  }
};

const styles = () =>
{
  return (
  {
    field: {width: '40rem'},
    divider: {height: '1rem'}
  })
}

export default withStyles(styles)(Submit);