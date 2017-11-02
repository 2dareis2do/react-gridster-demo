import React, { Component } from 'react';
import logo from './Gridster-Logo.png';
import './App.css';
import GridWidget from './components/GridWidget';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          Try to connect the start and end blocks that are coloured green.
        </p>
        <p>
          You can input any value for either columns or rows in the grid. The default is 10 x 10.
        </p>
        <p>
          To generate the grid, hit the <i>generate</i> button.
        </p>
        <p>
          Try to connect the start and end cells by clicking or touching them.
        </p>
        <GridWidget />
      </div>
    );
  }

}
