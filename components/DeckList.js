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
    const { decks } = this.props;
    const { isFetching, items } = decks;

    const hasDecks = !!(items && Object.keys(items).length);

    if (isFetching) {
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

    if (!isFetching && !hasDecks) {
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
        {hasDecks &&
          Object.values(items).map(deck => (
            <Deck key={deck.title} deck={deck} {...this.props} />
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
});

export default DeckList;
