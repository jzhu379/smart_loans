import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Home.css'
import axios_def from 'axios';

class Home extends Component {
  state = {accounts: null}

  getData = () => {
    axios_def.get('http://api.reimaginebanking.com/customers/' + this.props.data._id + '/accounts?key=925b21efc47b46165d21b9eacc69824a').then(res => {
      this.setState({accounts: res.data});
    }).catch(err => {
      this.setState({accounts: null});
    });
  }

  render() {
    if (this.props.data === null)
    {
      return (
        <div id = 'intro'>
          <h1 id = 'title'> Welcome to CaptialOne's Loan Default Predictor! </h1>
          <h2> This app allows the bank to predict whether a loan will be defaulted on. </h2>
        </div>
      );
    }
    else
    {
      if (this.state.accounts == null)
      {
        this.getData();
        return <CircularProgress classes = {{root: {position: 'fixed', top: '50%'}, colorPrimary: {color: '#40e0d0'}}} color = 'primary' thickness = {8} size = {100}/>;
      }

      return (
        <div id = 'intro'>
          <h1 id = 'title'> Hello {this.props.data.first_name + ' ' + this.props.data.last_name}! </h1>
          <h2> ID: {this.props.data._id}</h2>
          <h2> ADDRESS: </h2>
          <h4> street number: {this.props.data.address.street_number}</h4>
          <h4> street name: {this.props.data.address.street_name}</h4>
          <h4> city: {this.props.data.address.city}</h4>
          <h4> state: {this.props.data.address.state}</h4>
          <h4> zip: {this.props.data.address.zip}</h4>
          <h2> ACCOUNTS: </h2>
          {
            this.state.accounts.map(e => {
              return <h4 key={e._id}> id: {e._id}, type: {e.type}, nickname: {e.nickname}, balance: {e.balance} </h4>;
            })
          }
        </div>
      );
    }
  }
}

export default Home;