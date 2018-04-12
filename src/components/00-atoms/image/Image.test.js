import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { Image } from './Image';

describe('Atom: Image', () => {
  const minProps = {
    src: 'test.jpg',
    alt: 'Alt text',
  };

  it('renders correctly with minimal props', () => {
    const tree = shallow(
      <Image {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with proportions provided', () => {
    const tree = shallow(
      <Image {...minProps} x={1} y={1} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('adds class image--loaded when state is set to loaded: true', () => {
    const tree = mount(
      <Image {...minProps} />
    );

    tree.setState({loaded: true});

    expect(
      tree.find('.image').hasClass('image--loaded')
    ).toEqual(true);
  });

  it('changes state.loaded to false when src is changed', () => {
    const tree = mount(
      <Image {...minProps} />
    );

    tree.setProps({ src: 'test_2.jpg' });

    expect(
      tree.state().loaded
    ).toEqual(false);
  });

});
