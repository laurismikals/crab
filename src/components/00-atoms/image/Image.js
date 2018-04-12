import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';

import './Image.css';

export class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    className: PropTypes.string,
  };
  static defaultProps = {
    x: null,
    y: null,
    className: '',
  };
  state = {
    loaded: false,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        loaded: false,
      });
    }
  }
  loadHandler = () => {
    this.setState({
      loaded: true,
    });
  };
  render() {
    const {
      className,
      x,
      y,
      src,
      alt,
    } = this.props;

    const padding = x && y ? { padding: `0 0 ${(y * 100) / x}% 0` } : {};

    return (
      <figure
        className={`
          ${className}
          image
          ${x && y ? 'image--aspect' : ''}
          ${this.state.loaded ? 'image--loaded' : 'image--loading'}
        `}
        style={padding}
      >
        <LazyLoad
          offsetVertical={900}
        >
          <img
            src={src}
            alt={alt}
            onLoad={this.loadHandler}
          />
        </LazyLoad>
        <span className="image__loading" />
      </figure>
    );
  }
}

export default Image;
