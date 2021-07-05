import {getSingers} from '../../services/api';

export const SINGER_LOADING = 'SINGER_LOADING';
export const SINGER_FETCH_SUCCESS = 'SINGER_FETCH_SUCCESS';
export const SINGER_FETCH_FAILURE = 'SINGER_FETCH_FAILURE';
export const SINGER_FETCH_LOAD_MORE = 'SINGER_FETCH_LOAD_MORE';

export const fetchSingers = () => {
  return async dispatch => {
    dispatch({
      type: SINGER_LOADING,
    });

    try {
      const singers = await getSingers();
      dispatch({
        type: SINGER_FETCH_SUCCESS,
        singers: singers ? singers : [],
      });
    } catch (error) {
      dispatch({
        type: SINGER_FETCH_FAILURE,
      });
      throw new Error(err);
    }
  };
};
