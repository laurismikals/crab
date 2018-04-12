import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { ImageGrid } from './ImageGrid';

describe('Organisms: ImageGrid', () => {
  const minProps = {
    images: [
      {
        id: 1,
        image: 'image.webp',
        width: 100,
        height: 100,
      },
      {
        id: 2,
        image: 'image1.webp',
        width: 100,
        height: 100,
      }
    ],
    fetching: false,
  };

  it('renders correctly', () => {
    const tree = shallow(
      <ImageGrid />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when fetching', () => {
    const tree = shallow(
      <ImageGrid fetching={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with data', () => {
    const tree = shallow(
      <ImageGrid {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });
});
