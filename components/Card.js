import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonTouchableOpacity from './ui/ButtonTouchableOpacity';
import {
  black,
  purple,
  lightPurple,
  white,
  gray,
  antiFlashWhite,
} from '../utils/colors';

const CARD_MODES = {
  EDIT: 'edit',
  QUIZ: 'quiz',
  VIEW: 'view',
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: antiFlashWhite,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    minHeight: 100,
  },
  cardContainer: {
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
    textAlign: 'center',
    fontSize: 20,
    color: gray,
  },
});

class Card extends Component {
  state = {
    mode: CARD_MODES.VIEW,
  };

  render() {
    const { card, handleDeleteCard } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.cardContainer}>
          <Text>id: {card.id}</Text>
          <Text>Question: {card.question}</Text>
          <Text>Answer: {card.answer}</Text>

          <ButtonTouchableOpacity
            backgroundColor={lightPurple}
            marginTop={10}
            width={150}
            onPress={() => handleDeleteCard(card)}
          >
            <FontAwesome name="trash" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Delete card
            </Text>
          </ButtonTouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Card;
