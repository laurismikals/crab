import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';

import LoadingSpinner from '../../00-atoms/loading-spinner/LoadingSpinner';
import Image from '../../00-atoms/image/Image';

import './ImageGrid.css';

export class ImageGrid extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape),
    fetching: PropTypes.bool,
  };
  static defaultProps = {
    images: [],
    fetching: false,
  };
  render() {
    const {
      fetching,
      images,
    } = this.props;

    return (
      <div
        className="image-grid"
        style={fetching ? {minHeight: 50} : {}}
      >
        {fetching && <LoadingSpinner/>}
        {images &&
        <div className="width-100 margin-bottom-30">
          <div className="row row--gutters-30">
            {map(({id, image, width, height}) => (
              <div key={id} className="col-s1-24 col-s2-12 col-s4-8 col-s7-6 flex justify--center flex-align--center">
                <Image
                  className="margin-bottom-30"
                  src={image}
                  alt=""
                  x={width}
                  y={height}
                />
              </div>
            ))(images)}
          </div>
        </div>
        }
      </div>
    )
  }
}

export default ImageGrid;
