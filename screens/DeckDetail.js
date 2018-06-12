import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
  },
  cardCount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: gray,
  },
});

class DeckDetail extends Component {
  state = {
    isReady: false,
  };

  render() {
    const { navigation, deck, deckId } = this.props;
    const numOfCards = deck.questions.length;

    return (
      <View style={styles.container}>
        <View>
          <Text>deckId - {deckId}</Text>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{`${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={gray}
            onPress={() => {
              console.log('Edit Card navigate');
              navigation.navigate('EditCard', { deck, deckId });
            }}
          >
            <FontAwesome name="edit" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Edit Card
            </Text>
          </ButtonTouchableOpacity>

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={lightPurple}
            onPress={() => {
              console.log('Add Card navigate');
              navigation.navigate('AddCard', { deck, deckId });
            }}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </ButtonTouchableOpacity>

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={lightPurple}
            onPress={() => console.log('Start Quiz')}
          >
            <FontAwesome name="comments" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Start Quiz
            </Text>
          </ButtonTouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks.items[deckId];

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps)(DeckDetail);
