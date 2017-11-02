import React, { Component } from 'react';
import PropTypes from 'prop-types';

const inputStyle = {
  marginLeft: '.4rem',
  borderRadius: '.4rem',
  border: 'solid 1px #ccc',
  padding: '.4rem'
}

export default class Input extends Component {

  render() {
    return (
      <label>
        {this.props.name}
        <input style={inputStyle}
          type="text"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onchange}
          autoFocus="true"
        />
      </label>
    );
  }
}

Input.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func
};
