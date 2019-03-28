import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import SvgUri from 'react-native-svg-uri';
import Router from './Router';
import reducers from './reducers';

class App extends Component<Props> {
  render() {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <StatusBar
            barStyle='light-content'
          />
        <Router />
      </Provider>
    );
  }
}

export default App;
