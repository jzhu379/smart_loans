import React from 'react';
import './About.css'

const about = () => 
{
  return (
      <div id = 'intro'>
        <h2 id = 'about'> About Me </h2>
        <h3> im some random kid, whatever </h3>
        <img id = 'img' src = {require('../meme.jpg') } alt = 'reallyEdgyTeen'/>
      </div>
  );
};

export default about;