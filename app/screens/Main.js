import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';
import { primary } from '../utils/colors';

import AppStatusBar from '../components/ui/AppStatusBar';
import MainNavigator from '../components/Navigator';
import { setLocalNotification } from '../utils/helpers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];
// NOTE: No enhancers used for now, can be added here
const enhancers = [];

// only use logger outside of prod
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}

const store = createStore(
  rootReducer /* preloadState */,
  composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
);

export default class Main extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor={primary} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
