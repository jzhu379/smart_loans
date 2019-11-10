import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loan.css';
import axios_def from 'axios';
import axios from '../axios';

class Loan extends Component 
{
  state =
  {
    loan_amt: 0,
    monthly_pay: 0,
    balance: 0,
    credit_score: 0,
    loading: false,
    error: false,
    success: false
  }

  sendData = () =>
  {
    const data =
    {
      loan_amt: parseInt(this.state.loan_amt),
      monthly_pay: parseInt(this.state.monthly_pay),
      balance: parseInt(this.state.balance),
      credit_score: parseInt(this.state.credit_score)
    };

    this.setState({loading: true});
    axios_def.post('http://api.reimaginebanking.com/customers/' + this.props.data._id + '/accounts?key=925b21efc47b46165d21b9eacc69824a', data).then(res => {
      axios.post('/accounts.json', {...data, _id: this.props.data._id}).then((res) =>
      {
        this.setState({loading: false});
        this.setState({success: true});
      }).catch((e) =>
      {
        this.setState({loading: false});
        this.setState({error: true});
      });
    }).catch(e => {
      console.log(data);
      console.log(JSON.stringify(e));
      this.setState({loading: false});
      this.setState({error: true});
    });
  }

  reset = () =>
  {
    this.setState({
    loan_amt: 0,
    monthly_pay: 0,
    balance: 0,
    credit_score: 0,
    loading: false,
    error: false,
    success: false});
  }

  render()
  {
    const {classes} = this.props;

    let display = (
      <div>
        <h1> Create Account </h1>
        <TextField
          label = 'loan amount'
          className = {classes.field}
          id = 'loan_amt'
          name = 'loan_amt'
          value = {this.state.loan_amt}
          onChange = {(event) => {this.setState({loan_amt: event.target.value});}}
        />
        <div className = {classes.divider}/>
        <TextField
          label = 'monthly pay'
          className = {classes.field}
          id = 'monthly_pay'
          name = 'monthly_pay'
          value = {this.state.monthly_pay}
          onChange = {(event) => {this.setState({monthly_pay: event.target.value});}}
        />
        <div className = {classes.divider}/>
        <TextField
          label = 'balance'
          className = {classes.field}
          id = 'balance'
          name = 'balance'
          value = {this.state.balance}
          onChange = {(event) => {this.setState({balance: event.target.value});}}
        />
        <div className = {classes.divider}/>
        <TextField
          label = 'credit score'
          className = {classes.field}
          id = 'credit_score'
          name = 'credit_score'
          value = {this.state.balance}
          onChange = {(event) => {this.setState({credit_score: event.target.value});}}
        />
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
      display = (<CircularProgress classes = {{root: classes.spinner, colorPrimary: classes.spinnerColor}} color = 'primary' thickness = {8} size = {100}/>);
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
    divider: {height: '1rem'},
    spinner:
    {
      position: 'fixed',
      top: '50%'
    },
    spinnerColor: {color: '#40e0d0'}
  })
}

export default withStyles(styles)(Loan);