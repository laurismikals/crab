import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import { Pagination, PaginationItem } from './Pagination';

describe('Molecules: PaginationItem', () => {
  const minProps = {
    page: 1,
  };

  it('renders correctly', () => {
    const tree = shallow(
      <PaginationItem {...minProps} />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('Molecules: Pagination', () => {
  const minProps = {
    totalPages: 8,
  };

  it('renders correctly when current page is 1', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={0} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 2', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={1} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 3', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={2} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 4', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={3} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 5', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={4} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 6', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={5} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 7', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={6} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when current page is 8', () => {
    const tree = shallow(
      <Pagination {...minProps} currentPage={7} />
    );
    expect(tree).toMatchSnapshot();
  });
});
