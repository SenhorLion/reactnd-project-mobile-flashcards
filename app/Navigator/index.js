import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { white, purple } from '../utils/colors';
import Decks from '../screens/Decks';
import DeckDetail from '../screens/DeckDetail';
import AddDeck from '../screens/AddDeck';
import AddCard from '../screens/AddCard';
import EditCard from '../screens/EditCard';
import Quiz from '../screens/Quiz';

// const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//       navigationOptions: {
//         header: () => null,
//       },
//     },
//     Options: {
//       screen: Options,
//       navigationOptions: {
//         headerTitle: 'Options',
//       },
//     },
//     Themes: {
//       screen: Themes,
//       navigationOptions: {
//         headerTitle: 'Themes',
//       },
//     },
//   },
//   {
//     headerMode: 'screen',
//   }
// );

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
        headerTitle: 'Deck', //navigation.state.params.deck.title,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    EditCard: {
      screen: EditCard,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.deck.title,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.deck.title,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTitle: 'Quiz',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
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

const DeckStack = createStackNavigator(
  {
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        // header: null,
        headerTitle: 'Add Deck',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Deck', //navigation.state.params.deck.title,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTitle: 'Add Card',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
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
    tabBarOptions: {},
  }
);
