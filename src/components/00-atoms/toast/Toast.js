import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/fp/includes'
import noop from 'lodash/fp/noop'

import Interval from '../../../helpers/interval';

export class Toast extends PureComponent {
  static propTypes = {
    message: PropTypes.string.isRequired,
    type: (props, propName, componentName) => {
      if (!includes(props[propName])(['success', 'warning', 'error'])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.' +
          'It should be one of the following: success, warning, error.'
        );
      }
    },
    id: PropTypes.string.isRequired,
    onEnd: PropTypes.func,
    time: PropTypes.number,
  };
  static defaultProps = {
    onEnd: noop,
    time: 5000,
  };
  constructor(props){
    super(props);
    this.state = {
      initialTime: this.props.time,
      time: this.props.time,
      finished: false,
    };
  }
  removeToast() {
    this.interval.clear();

    this.setState({
      finished: true,
    });
    setTimeout(() => {
      this.props.onEnd(this.props.id);
    }, 300);
  }
  timer = () => {
    if (this.state.time <= 0) {
      this.removeToast();
    } else {
      this.setState({
        time: this.state.time - 10,
      })
    }
  };
  onClickHandler = () => {
    this.removeToast();
  };
  mouseEnterHandler = () => {
    this.interval.pause();
  };
  mouseLeaveHandler = () =>{
    this.interval.resume();
  };
  componentDidMount() {
    this.interval = new Interval(this.timer, 10);
  }
  render() {
    const { message, type } = this.props;
    const { time, finished, initialTime } = this.state;

    return (
      <div
        className={`toast toast-${type} ${finished ? 'toast--fade-out' : ''}`}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <div
          className="toast-progress"
          style={{ width: `${time * 100 / initialTime}%`, }}
        />
        <button
          type="button"
          className="toast-close-button"
          onClick={this.onClickHandler}
        >
          ×
        </button>
        <div className="toast-message">
          {message}
        </div>
      </div>
    )
  }
}

export default Toast;
