import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { LoadingSpinner } from './LoadingSpinner';

describe('Atom: LoadingSpinner', () => {
  it('renders correctly', () => {
    const tree = shallow(
      <LoadingSpinner />
    );
    expect(tree).toMatchSnapshot();
  });
});
