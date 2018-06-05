import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  black,
  purple,
  lightPurple,
  white,
  gray,
  antiFlashWhite,
} from '../utils/colors';
import { FontAwesome } from '@expo/vector-icons';

const Deck = ({ deck, deck: { title, questions }, navigation }) => {
  const hasDeck = !!(deck && Object.keys(deck).length);

  if (!hasDeck) {
    return (
      <View style={styles.deck}>
        <Text>No Deck exists</Text>
      </View>
    );
  }
  return (
    <View style={styles.deck}>
      <View style={styles.deckContainer}>
        <Text style={[styles.titleText, {}]}>{title}</Text>
        <Text style={styles.subText}>{`${questions.length} cards`}</Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 20, width: 150 }]}
          onPress={() => {
            return navigation.navigate('DeckDetail', { deck, entryId: title });
          }}
        >
          <FontAwesome name="plus" size={20} color={antiFlashWhite} />
          <Text style={{ fontSize: 18, color: antiFlashWhite }}>View deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: antiFlashWhite,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    minHeight: 180,
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: purple,
  },
  subText: {
    // flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: gray,
  },
  button: {
    flexDirection: 'row',
    padding: 4,
    margin: 4,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
});

export default Deck;
