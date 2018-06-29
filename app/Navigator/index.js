import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Decks from '../screens/Decks';
import DeckDetail from '../screens/DeckDetail';
import AddDeck from '../screens/AddDeck';
import AddCard from '../screens/AddCard';
import EditCard from '../screens/EditCard';
import Quiz from '../screens/Quiz';

import { primary, primaryText, grey400 } from '../utils/colors';

const headerDefaultStyle = {
  backgroundColor: primary,
};

const navigatorDefaultOptions = {
  headerTintColor: primaryText,
  headerStyle: headerDefaultStyle,
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Decks,
      navigationOptions: {
        header: null,
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        ...navigatorDefaultOptions,
        headerTitle: 'Deck',
      }),
    },
    EditCard: {
      screen: EditCard,
      navigationOptions: ({ navigation }) => ({
        ...navigatorDefaultOptions,
        headerTitle: navigation.state.params.deck.title,
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        ...navigatorDefaultOptions,
        headerTitle: navigation.state.params.deck.title,
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        ...navigatorDefaultOptions,
        headerTitle: 'Quiz',
      },
    },
  },
  {
    mode: 'modal',
    cardStyle: {
      paddingTop: StatusBar.currentHeight,
    },
    headerMode: 'screen',
  }
);

// TODO: This navigation doesnt feel quite right,
// especially when ading a new deck ...
const DeckStack = createStackNavigator(
  {
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        // header: null,
        ...navigatorDefaultOptions,
        headerTitle: 'Add Deck',
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        ...navigatorDefaultOptions,
        headerTitle: 'Deck', //navigation.state.params.deck.title,
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        ...navigatorDefaultOptions,
        headerTitle: 'Add Card',
      },
    },
  },
  {
    mode: 'modal',
    cardStyle: {
      paddingTop: StatusBar.currentHeight,
    },
    headerMode: 'screen',
  }
);

// Export tabs navigation as main component
export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="list" size={30} color={tintColor} />
        ),
      },
    },
    Decks: {
      screen: DeckStack,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {},
    tabBarOptions: {
      activeTintColor: primary,
      inactiveTintColor: grey400,
      style: {
        paddingTop: 6,
      },
    },
  }
);
