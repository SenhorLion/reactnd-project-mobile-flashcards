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
import rootReducer from './reducers';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { white, purple } from './utils/colors';
import Decks from './screens/Decks';
import DeckDetail from './screens/DeckDetail';
import AddDeck from './screens/AddDeck';
import AddCard from './screens/AddCard';
import EditCard from './screens/EditCard';
import AppStatusBar from './components/ui/AppStatusBar';

// NOTE: composeWithDevTools not currently working in redux dev
const composeEnhancers = composeWithDevTools({ realtime: true });
const middleWare = [thunk];
const store = createStore(
  rootReducer /* preloadState */,
  composeEnhancers(applyMiddleware(...middleWare))
);

const AddDeckStack = createStackNavigator({
  // AddDeck: AddDeck,
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      header: null,
    },
  },
  AddCard: AddCard,
});

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
      screen: AddDeckStack,
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
  EditCard: {
    screen: EditCard,
    navigationOptions: {
      title: 'Edit Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  // Quiz: {
  //   screen: Quiz,
  //   navigationOptions: {
  //     title: 'Quiz',
  //     headerTintColor: white,
  //     headerStyle: {
  //       backgroundColor: purple,
  //     },
  //   },
  // },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
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
          <AppStatusBar backgroundColor={purple} barStyle="light-content" />
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
