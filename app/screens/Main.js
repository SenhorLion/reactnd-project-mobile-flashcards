import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';
import { primary, primaryLight, purple } from '../utils/colors';

import AppStatusBar from '../components/ui/AppStatusBar';
import MainNavigator from '../Navigator';

// NOTE: composeWithDevTools not currently working in redux dev
// const composeEnhancers = composeWithDevTools({ realtime: true });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
  state = {
    isReady: false,
  };

  componentDidMount() {
    // setLocalNotification();
  }

  render() {
    // TODO: AppLoading not working?
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }

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
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
