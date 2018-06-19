import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { AppLoading } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from '../reducers';
import { purple } from '../utils/colors';

import AppStatusBar from '../components/ui/AppStatusBar';
import MainNavigator from '../Navigator';
import { Container } from '../components/Container';

// NOTE: composeWithDevTools not currently working in redux dev
const composeEnhancers = composeWithDevTools({ realtime: true });
const middleWare = [thunk];
const store = createStore(
  rootReducer /* preloadState */,
  composeEnhancers(applyMiddleware(...middleWare))
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
        <Container>
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </Container>
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
