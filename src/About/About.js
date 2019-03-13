import React, {Component} from 'react';

import './About.css'

let img = null;

class About extends Component 
{
  componentWillMount()
  {
    img = require('../meme.jpg');
  }

  render()
  {
    return (
      <div id = 'intro'>
        <h2 id = 'about'> About Me </h2>
        <h3> im some random kid, whatever </h3>
        <img rel = 'preload' id = 'img' src = {img} alt = 'reallyEdgyTeen'/>
      </div>
  );
  }
};

export default About;