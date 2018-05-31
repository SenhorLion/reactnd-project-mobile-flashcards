import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { fetchDecksData } from '../api';
import {
  black,
  purple,
  lightPurple,
  white,
  gray,
  antiFlashWhite,
} from '../utils/colors';

import { enforcePromiseDelay } from '../utils/helpers';
import Deck from './Deck';
import ErrorBoundary from '../error/ErrorBoundary';

class DeckList extends Component {
  render() {
    const { decks, isDecksLoaded } = this.props;
    const hasDecks = !!(decks && Object.keys(decks).length);

    if (!isDecksLoaded) {
      return (
        <View
          style={{
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text dataTestId="loading" style={{ fontSize: 20 }}>
            Loading Decks...
          </Text>;
        </View>
      );
    }

    if (isDecksLoaded && !hasDecks) {
      return (
        <View
          style={{
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text dataTestId="loading" style={{ fontSize: 20 }}>
            No Decks available to show.
          </Text>;
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        <ErrorBoundary>
          {hasDecks &&
            Object.keys(decks).map(deck => (
              <Deck
                key={decks[deck].title}
                deck={decks[deck]}
                {...this.props}
              />
            ))}
        </ErrorBoundary>
      </ScrollView>
    );
  }
}

// React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces',
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event',
//       },
//     ],
//   },

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
});

export default DeckList;
