import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { Button } from './Button';

describe('Atom: Button', () => {
  const minProps = {
    size: 'large',
    appearance: 'default',
    text: 'Button text',
  };

  it('renders correctly', () => {
    const tree = shallow(
      <Button {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });
});
