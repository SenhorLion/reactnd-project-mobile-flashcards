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
import ButtonTouchableOpacity from './ui/ButtonTouchableOpacity';

const Deck = props => {
  const { deck, deck: { title, questions }, navigation } = props;

  console.log('DECK PROPS: ', props);
  const hasDeck = !!(deck && Object.keys(deck).length);

  const handleDeleteDeck = deckId => {
    console.log('DECK :: handleDeleteDeck', title);
    props.onDeleteDeck(title);
  };

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

        <ButtonTouchableOpacity
          backgroundColor={lightPurple}
          marginTop={20}
          width={150}
          onPress={handleDeleteDeck}
        >
          <FontAwesome name="trash" size={20} color={antiFlashWhite} />
          <Text style={{ fontSize: 18, color: antiFlashWhite }}>
            Delete deck
          </Text>
        </ButtonTouchableOpacity>
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
