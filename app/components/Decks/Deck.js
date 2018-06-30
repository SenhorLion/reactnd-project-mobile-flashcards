import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { primary, antiFlashWhite } from '../../utils/colors';
import { FontAwesome } from '@expo/vector-icons';
import { ButtonTouchableOpacity } from '../Buttons';
import styles from './styles';
import { pluralize } from '../../utils/helpers';

class Deck extends Component {
  render() {
    const { deck, deck: { id, title, questions }, navigation } = this.props;
    const numOfCards = questions.length;

    return (
      <View style={styles.deck}>
        <View style={styles.deckContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subText}>{`${numOfCards} ${pluralize(
            'card',
            numOfCards
          )}`}</Text>
          <ButtonTouchableOpacity
            backgroundColor={primary}
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
        </View>
      </View>
    );
  }
}

export default Deck;
