import React from 'react';
import './Home.css'

const home = (props) => 
{
  if (props.data === null)
  {
    return (
      <div id = 'intro'>
        <h1 id = 'title'> Welcome to TravelTogether! </h1>
        <h2> Need to split the fare? Or just need a travel companion? </h2>
        <h2> Well look no further! Our app will help you get into touch with other travelers around you! </h2>
      </div>
    );
  }
  else
  {
    return (
      <div id = 'intro'>
        <h1 id = 'title'> Hello {props.data.name}! </h1>
        <h2> Your profile information is listed below: </h2>
        <h2> AGE: {getAge(props.data.birthday)} </h2>
        <h2> GENDER: {props.data.gender} </h2>
      </div>
    );
  }
};

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

export default home;