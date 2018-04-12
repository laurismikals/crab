import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/fp/includes';

import './Button.css';

export class Button extends PureComponent{
  static propTypes = {
    type: (props, propName, componentName) => {
      if (!includes(props[propName])(['button', 'submit', 'reset'])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.' +
          'It should be one of the following: button, submit, reset.'
        );
      }
    },
    size: (props, propName, componentName) => {
      if (!includes(props[propName])(['small', 'large'])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.' +
          'It should be one of the following: small, large.'
        );
      }
    },
    appearance: (props, propName, componentName) => {
      if (!includes(props[propName])(['default', 'primary'])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.' +
          'It should be one of the following: default, primary.'
        );
      }
    },
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
  };
  static defaultProps = {
    type: 'button',
    className: '',
  };
  render() {
    const {
      type,
      size,
      appearance,
      className,
      text,
      ...others
    } = this.props;

    return (
      <button
        type={type}
        className={`
          btn
          ${className}
          btn--${size}
          btn--${appearance}
        `}
        {...others}
      >
        <span className="btn__flex-fix">
          <span className="btn__text">{text}</span>
        </span>
      </button>
    )
  }
}

export default Button;
