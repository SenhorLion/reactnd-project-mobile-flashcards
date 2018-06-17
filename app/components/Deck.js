import React, { Component } from 'react';
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

class Deck extends Component {
  render() {
    const {
      deck,
      deck: { id, title, questions },
      handleDeleteDeck,
      navigation,
    } = this.props;

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
          <ButtonTouchableOpacity
            backgroundColor={purple}
            marginTop={10}
            width={150}
            onPress={() => {
              return navigation.navigate('DeckDetail', {
                deck,
                deckId: id,
              });
            }}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              View deck
            </Text>
          </ButtonTouchableOpacity>

          <ButtonTouchableOpacity
            backgroundColor={lightPurple}
            marginTop={10}
            width={150}
            onPress={() => handleDeleteDeck(deck)}
          >
            <FontAwesome name="trash" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Delete deck
            </Text>
          </ButtonTouchableOpacity>
        </View>
      </View>
    );
  }
}

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
});

export default Deck;
