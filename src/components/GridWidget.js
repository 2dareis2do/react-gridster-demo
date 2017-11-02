import React, { Component } from 'react';

import GridsterStore from '../stores/GridsterStore.js';
import Button from './Button';
import Input from './Input';
import Grid from './Grid';
import { updateRow } from '../actions/GridsterActions.js';
import { updateColumn } from '../actions/GridsterActions.js';
import { generateGrid } from '../actions/GridsterActions.js';
import { generateStart } from '../actions/GridsterActions.js';
import { generateEnd } from '../actions/GridsterActions.js';

const spanStyle = {
  marginLeft: '1rem',
  marginRight: '1rem'
}

export default class GridWidget extends Component {

  constructor(props) {
    super(props);
    this._onChangeCols = this._onChangeCols.bind(this);
    this._onChangeRows = this._onChangeRows.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onGenerateGrid = this._onGenerateGrid.bind(this);
    this.state = {
      columns: 10,
      rows: 10,
      grid: []
    };
  }

  componentDidMount() {
    GridsterStore.addChangeListener(this._onChange);
    this.setState(GridsterStore.getGrid());
  }

  componentWillUnmount() {
    GridsterStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(GridsterStore.getGrid());
  }

  _onChangeRows(event) {
    this.setState({
      rows: event.target.value
    });
  }

  _onChangeCols(event) {
    this.setState({
      columns: event.target.value
    });
  }

  _onGenerateGrid() {
    updateColumn(this.state.columns);
    updateRow(this.state.rows);
    generateGrid();
    generateStart();
    generateEnd();
  }

  render() {
    return (
      <div className="container">
        <div className="inner-container">
          <form>
            <Input
              name="Columns"
              value={this.state.columns}
              onchange={this._onChangeCols}
            />
            <span style={spanStyle}> x </span>
            <Input
              name="Rows"
              value={this.state.rows}
              onchange={this._onChangeRows}
            />

            <Button text="Generate" onclick={this._onGenerateGrid}/>
          </form>
        </div>
        <div className="inner-container">
          <Grid
            grid={this.state.grid}
          />
        </div>
    </div>
    );
  }

}

