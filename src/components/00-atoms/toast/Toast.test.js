import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { Toast } from './Toast';
import { ToastContainer } from './ToastContainer';

describe('Atom: Toast', () => {
  const minProps = {
    message: 'This is toast message.',
    type: 'success',
    id: '1',
  };

  it('renders correctly', () => {
    const tree = shallow(
      <Toast {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('adds class toast--fade-out when state is set to finished: true', () => {
    const tree = shallow(
      <Toast {...minProps} />
    );

    tree.setState({finished: true});

    expect(
      tree.find('.toast').hasClass('toast--fade-out')
    ).toEqual(true);
  });

});

describe('Atom: ToastContainer', () => {
  const minProps = {
    toasts: [
      {
        id: '1',
        message: 'This is toast success message.',
        type: 'success',
      },
      {
        id: '2',
        message: 'This is toast warning message.',
        type: 'warning',
      },
      {
        id: '3',
        message: 'This is toast error message.',
        type: 'error',
      }
    ],
  };

  it('renders correctly', () => {
    const tree = shallow(
      <ToastContainer {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });

});
