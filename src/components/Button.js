import React, { Component } from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  marginLeft: '.4rem',
  borderRadius: '.4rem',
  border: 'solid 1px #ccc',
  padding: '0.4rem 1rem',
	margin: '0 1rem',
	cursor: 'pointer'
}

export default class Button extends Component {

  render() {
    return (

        <button
        	style={buttonStyle}
          type="button"
          onClick={this.props.onclick}>
          {this.props.text}
        </button>

    );
  }

}

Button.propTypes = {
  text: PropTypes.string
};
