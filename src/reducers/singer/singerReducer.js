import {
  SINGER_LOADING,
  SINGER_FETCH_SUCCESS,
  SINGER_FETCH_FAILURE,
} from './singerActions';

const initialState = {
  singers: [],
  singer: null,
  isLoading: true,
};

export const singerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGER_LOADING:
      return {...state, isLoading: true};
    case SINGER_FETCH_FAILURE:
      return {...state, isLoading: false};
    case SINGER_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singers: [...action.singers],
      };
    default:
      return state;
  }
};
