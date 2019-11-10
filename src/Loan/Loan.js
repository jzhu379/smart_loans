import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loan.css';
import axios from 'axios';

class Loan extends Component 
{
  state =
  {
    loan_amt: 0,
    monthly_pay: 0,
    credit_score: 0,
    loading: false,
    error: false,
    success: false,
    accounts: null
  }

  sendData = () =>
  {
    this.setState({loading: true});
    axios.get('http://api.reimaginebanking.com/customers/' + this.props.data._id + '/accounts?key=925b21efc47b46165d21b9eacc69824a').then(res => {
      this.setState({accounts: res.data, success: true, loading: false});
    }).catch(err => {
      this.setState({loading: false});
      this.setState({error: true});
    });
  }

  reset = () =>
  {
    this.setState({
    loan_amt: 0,
    monthly_pay: 0,
    credit_score: 0,
    loading: false,
    error: false,
    success: false,
    accounts: null});
  }

  render()
  {
    const {classes} = this.props;

    const calculate = () => {
      const loan_amt = parseInt(this.state.loan_amt);
      const monthly_pay = parseInt(this.state.monthly_pay);
      const credit_score = parseInt(this.state.credit_score);
      let score = 0;
      if (credit_score >= 800) {
        score = 7;
      } else if (credit_score >= 725) {
        score = 6;
      } else if (credit_score >= 625) {
        score = 5;
      } else if (credit_score >= 550) {
        score = 4;
      } else if (credit_score >= 500) {
        score = 3;
      } else if (credit_score >= 350) {
        score = 2;
      } else {
        score = 1;
      }
      let balance = 0;
      for (let i = 0; i < this.state.accounts.length; i++) {
        balance += this.state.accounts[i].balance;
      }
  
      const a = -6.27401143e-5*loan_amt + 1.25645540e-3*monthly_pay + 1.51174298e-5*balance + 2.80145060e-1*score + 0.03387403;
      const b = 6.75200223e-5*loan_amt - 3.32968122e-3*monthly_pay -1.22907556e-05*balance - 5.55766051e-1*score - 0.1046463;
      const c = 5.47918276e-5*loan_amt - 1.08847199e-3*monthly_pay - 1.51496012e-5*balance - 3.06137819e-1*score - 0.03568204;

      const x_1 = 1.0/(1+Math.pow(Math.E, -a));
      const x_2 = 1.0/(1+Math.pow(Math.E, -b));
      const x_3 = 1.0/(1+Math.pow(Math.E, -c));
      const sum = x_1 + x_2 + x_3;

      return [x_1/parseFloat(sum), x_2/parseFloat(sum), x_3/parseFloat(sum)];
    }

    let display = (
      <div>
        <h1> Calculate Loan Default Risk </h1>
        <TextField
          label = 'loan amount'
          type = 'number'
          className = {classes.field}
          id = 'loan_amt'
          name = 'loan_amt'
          value = {this.state.loan_amt}
          onChange = {(event) => {this.setState({loan_amt: event.target.value});}}
        />
        <div className = {classes.divider}/>
        <TextField
          label = 'monthly pay'
          type = 'number'
          className = {classes.field}
          id = 'monthly_pay'
          name = 'monthly_pay'
          value = {this.state.monthly_pay}
          onChange = {(event) => {this.setState({monthly_pay: event.target.value});}}
        />
        <div className = {classes.divider}/>
        <TextField
          label = 'credit score'
          type = 'number'
          className = {classes.field}
          id = 'credit_score'
          name = 'credit_score'
          value = {this.state.credit_score}
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
      const values = calculate();
      let msg = '';
      if (values[0] > values[1] && values[0] > values[2]) {
        msg = 'The bank has determined you have a low risk of defaulting with a score of ' + values[0].toFixed(4) + ' out of 1.';
      } else if (values[1] > values[0] && values[1] > values[2]) {
        msg = 'The bank has determined you have a medium risk of defaulting with a score of ' + values[1].toFixed(4) + ' out of 1.';
      } else {
        msg = 'The bank has determined you have a high risk of defaulting with a score of ' + values[2].toFixed(4) + ' out of 1.';
      }

      display = (
        <div>
          <h2> Submission successful. </h2>
          <h2> {msg} </h2>
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