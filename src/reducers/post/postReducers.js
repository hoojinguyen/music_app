import {
  POST_LOADING,
  POST_FETCH_SUCCESS,
  POST_FETCH_FAILURE,
  POST_FETCH_LOAD_MORE,
} from './postActions';

const initialState = {
  posts: [],
  post: null,
  isLoading: true,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {...state, isLoading: true};
    case POST_FETCH_FAILURE:
      return {...state, isLoading: false};
    case POST_FETCH_SUCCESS:
      return {...state, isLoading: false, posts: [...action.posts]};
    case POST_FETCH_LOAD_MORE:
      const posts = state.posts.concat(action.posts);
      return {...state, posts: [...posts]};
    default:
      return state;
  }
};
