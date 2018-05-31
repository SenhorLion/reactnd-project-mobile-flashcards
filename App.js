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

import { Constants, AppLoading } from 'expo';

import { white, purple } from './utils/colors';
import Decks from './screens/Decks';
import DeckDetail from './screens/DeckDetail';
import AddDeck from './screens/AddDeck';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// TODO: make AppStatusBar its own module
const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

// TODO make Tabs navigation its own module
const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="list" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
      },
    },
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Detail',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
});

export default class App extends Component {
  state = {
    isReady: false,
  };

  render() {
    // TODO: AppLoading not working?
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }

    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: white,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
