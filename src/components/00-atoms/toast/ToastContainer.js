import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/fp/map';

import { clearToast } from '../../../modules/toast';

import Toast from './Toast';

import './Toast.css';

export class ToastContainer extends PureComponent {
  static propTypes = {
    toasts: PropTypes.arrayOf(PropTypes.shape),
  };
  static defaultProps = {
    toasts: [],
  };
  onEndHandler(id) {
    this.props.clearToast(id);
  }
  render() {
    const { toasts } = this.props;

    return (
      <div
        id="toast-container"
        className="toast-container toast-top-right"
        aria-live="polite"
        role="alert"
      >
        {map(({ id, message, type })=> (
          <Toast
            key={id}
            id={id}
            message={message}
            type={type}
            onEnd={this.onEndHandler.bind(this)}
          />
        ))(toasts)}
      </div>
    )
  }
}

const mapStateToProps = ({
  toast: { toasts },
}) => ({
  toasts,
});

const mapDispatchToProps = {
  clearToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer);
