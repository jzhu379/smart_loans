import React from 'react';
import './About.css'

const about = () => 
{
  return (
      <div className = 'intro'>
        <h2 className = 'about'> About Me </h2>
        <h3> im some random kid, whatever </h3>
        <img className = 'img' src = {require('../meme.jpg') } alt = 'reallyEdgyTeen'/>
      </div>
  );
};

export default about;