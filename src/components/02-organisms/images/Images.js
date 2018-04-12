import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from 'lodash/fp/noop';

import Button from '../../00-atoms/button/Button';
import ImageGrid from '../../01-molecules/image-grid/ImageGrid';
import Pagination from '../../01-molecules/pagination/Pagination';
import Toast from '../../00-atoms/toast/ToastContainer';

import { fetchImages } from '../../../modules/images';

import '../../../assets/css/03-objects/grid.css';
import '../../../assets/css/04-helpers/sizes.css';
import '../../../assets/css/04-helpers/margins.css';
import '../../../assets/css/04-helpers/flexbox.css';

const IMAGES_PER_PAGE = 25;
const HARD_GIPHY_LIMIT = 4999;

export class Images extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape),
    onLoadImagesClick: PropTypes.func,
    fetching: PropTypes.bool,
    totalImagesSize: PropTypes.string,
    offset: PropTypes.number,
  };
  static defaultProps = {
    data: [],
    onLoadImagesClick: noop,
    fetching: false,
    totalImagesSize: '',
    offset: 0,
  };
  render() {
    const {
      data,
      fetching,
      totalImagesSize,
      offset,
      onLoadImagesClick,
    } = this.props;

    return (
      <div className="container">
        <div className="width-100 margin-bottom-30"/>
        {!data &&
          <Button
            type="button"
            size="large"
            appearance="primary"
            text="Parādīt attēlus"
            onClick={() => onLoadImagesClick(offset)}
          />
        }
        <ImageGrid
          images={data}
          fetching={fetching}
        />
        {data &&
          <Pagination
            className="margin-bottom-40"
            currentPage={Math.floor(offset / IMAGES_PER_PAGE)}
            totalPages={Math.floor(HARD_GIPHY_LIMIT / IMAGES_PER_PAGE)}
            onClick={onLoadImagesClick.bind(this)}
          />
        }
        {data &&
          <p className="width-100 margin-bottom-80">
            Total images size: {totalImagesSize}
          </p>
        }
        <Toast />
      </div>
    )
  }
}

const mapStateToProps = ({
 images: {
   data,
   fetching,
   totalImagesSize,
   offset,
 },
}) => ({
  data,
  fetching,
  totalImagesSize,
  offset,
});

const mapDispatchToProps = {
  onLoadImagesClick: fetchImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);
