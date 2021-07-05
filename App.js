import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import ReduxThunk from 'redux-thunk';
import {songReducer, singerReducer} from './src/reducers';

import {AppNavigator} from './src/navigation/AppNavigator';

const rootReducer = combineReducers({
  singer: singerReducer,
  song: songReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
