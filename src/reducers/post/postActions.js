import axios from 'axios';

export const POST_LOADING = 'POST_LOADING';
export const POST_FETCH_SUCCESS = 'POST_FETCH_SUCCESS';
export const POST_FETCH_FAILURE = 'POST_FETCH_FAILURE';
export const POST_FETCH_LOAD_MORE = 'POST_FETCH_LOAD_MORE';

import DATA_SAMPLE from '../../services/instructions';

const API_URL =
  'https://my-json-server.typicode.com/mesandigital/demo/instructions';

export const fetchPosts = () => {
  return async dispatch => {
    dispatch({
      type: POST_LOADING,
    });

    await axios
      .get(API_URL)
      .then(({data}) => {
        dispatch({
          type: POST_FETCH_SUCCESS,
          posts: data,
        });
      })
      .catch(err => {
        dispatch({
          type: POST_FETCH_FAILURE,
        });
        throw new Error(err);
      });
  };
};

export const loadMorePosts = () => {
  return async dispatch => {
    dispatch({type: POST_FETCH_LOAD_MORE, posts: DATA_SAMPLE});
  };
};
