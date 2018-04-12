import map from 'lodash/fp/map';
import reduce  from 'lodash/fp/reduce';

import formatBytes from '../helpers/formatBytes';

import { createToast } from './toast';

const FETCHING_IMAGES = 'FETCHING_IMAGES';
const IMAGES_FETCHED = 'IMAGES_FETCHED';
const IMAGES_ERROR = 'IMAGES_ERROR';

const IMAGES_PER_PAGE = 25;

const initialState = {
  fetching: false,
  error: false,
  data: null,
  offset: 0,
  totalImagesSize: '',
};

const imagesFetched = (payload) => ({
  type: IMAGES_FETCHED,
  payload,
});

const imagesError = () => ({
  type: IMAGES_ERROR,
});

export const fetchImages = (offset) => async (dispatch) => {
  dispatch({type: FETCHING_IMAGES});

  try {
    const response = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&offset=${offset * IMAGES_PER_PAGE}`);
    const json = await response.json();

    dispatch(imagesFetched(json));
  } catch (error) {
    dispatch(imagesError());
    dispatch(createToast({message: 'Ir atgadījusies kļūda', type: 'error'}));
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_IMAGES:
      state = {
        ...state,
        fetching: true,
        error: false,
      };
      return state;
    case IMAGES_FETCHED:
      const {
        data,
        pagination: { offset, }
      } = action.payload;

      const getTotalImagesSize = (data) =>
        reduce((sum, { images: { fixed_height_downsampled: { webp_size } }}) =>
          sum + parseInt(webp_size, 10), 0)(data);

      const takeImages = map(({id, images: { fixed_height_downsampled: { webp, width, height } }}) => ({
        id,
        image: webp,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
      }))(data);

      state = {
        ...state,
        fetching: false,
        data: takeImages,
        offset,
        totalImagesSize: formatBytes(getTotalImagesSize(data)),
      };
      return state;
    case IMAGES_ERROR:
      return {
        ...state,
        error: true,
        fetching: false,

      };
    default:
      return state;
  }
};
