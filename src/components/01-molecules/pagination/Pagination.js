import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/fp/noop';

import './Pagination.css';

const numberRangeArray = start => end =>
  new Array(end - start).fill().map((d, i) => i + start);

export class PaginationItem extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    isActive: false,
    onClick: noop,
  };
  render() {
    const { page, isActive, onClick } = this.props;
    return (
      <li key={page} className="pagination__item">
        <a
          href=""
          tabIndex="1"
          className={`pagination__link ${isActive ? 'active' : ''}`}
          onClick={onClick}
        >
          {page}
        </a>
      </li>
    )
  }
}

export class Pagination extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    visiblePages: PropTypes.number,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    className: '',
    visiblePages: 5,
    onClick: noop,
  };
  onClickHandler = (e, page) => {
    e.preventDefault();

    this.props.onClick(page);
  };
  render() {
    const {
      className,
      visiblePages,
      currentPage,
      totalPages,
    } = this.props;

    const wingSize = Math.floor(visiblePages / 2); // Number of pages visible before and after currentPage
    const separatorFill = 2; // Taking into account "..." separator cell. Separator shouldn't be visible in situation lik this - 1 ... 3, but it should be filled with a page like this - 1 2 3.

    const firstPageSeparationConditions =
      currentPage - visiblePages >= 0 &&
      totalPages - visiblePages - separatorFill > 0;
    // Checking if first page is separated from page range.
    const isFirstSeparate =
      currentPage >= visiblePages + wingSize || firstPageSeparationConditions;

    // Checking if last page is separated from page range
    const isLastSeparate =
      totalPages - separatorFill > currentPage + 1 + wingSize &&
      totalPages - (visiblePages + separatorFill) > 0;

    // Determining how many pages to add at the beginning of
    // the page range to make length of the range equal to visiblePages.
    const additionalPagesStart = !isLastSeparate ?
      currentPage >= totalPages - separatorFill ?
        separatorFill - (totalPages - currentPage) + 1 : 0
      :
      0;
    // Determining how many pages to add to the end of
    // the page range to make length of the range equal to visiblePages.
    const additionalPagesEnd = !isFirstSeparate ?
      wingSize < currentPage && currentPage < visiblePages ?
        currentPage + 1 + separatorFill : visiblePages
      :
      visiblePages;

    const rangeStart = !isFirstSeparate ? 0 : currentPage - wingSize - additionalPagesStart;
    const rangeEnd = !isLastSeparate ? totalPages : rangeStart + additionalPagesEnd;

    const pageArr = numberRangeArray(rangeStart)(rangeEnd);

    return (
      <nav className={`pagination ${className}`}>
        <ul className="pagination__items">
          {isFirstSeparate &&
            <PaginationItem
              page={1}
              onClick={(e) => this.onClickHandler(e, 0)}
            />
          }
          {isFirstSeparate &&
            <li className="pagination__item">
              <div className="pagination__link">
                ...
              </div>
            </li>
          }
          {pageArr.map((page) => {
            return (
              <PaginationItem
                key={page}
                page={page + 1}
                isActive={currentPage === page}
                onClick={(e) => this.onClickHandler(e, page)}
              />
            )
          })}
          {isLastSeparate &&
          <li className="pagination__item">
            <div className="pagination__link">
              ...
            </div>
          </li>
          }
          {isLastSeparate &&
          <PaginationItem
            page={totalPages}
            onClick={(e) => this.onClickHandler(e, totalPages - 1)}
          />
          }
        </ul>
      </nav>
    )
  }
}

export default Pagination;
