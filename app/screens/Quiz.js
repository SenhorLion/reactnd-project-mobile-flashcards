import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { FontAwesome } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';
import ButtonIcon from '../components/ui/ButtonIcon';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
  },
  cardCount: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: gray,
  },
});

class Quiz extends Component {
  state = {
    isReady: false,
  };

  render() {
    const { navigation, deck, deckId } = this.props;
    const numOfCards = deck.questions.length;

    return (
      <View style={styles.container}>
        <View>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>Quiz :: {deck.title}</Text>
            <Text style={styles.cardCount}>{`${numOfCards} ${
              numOfCards > 1 ? 'cards' : 'card'
            }`}</Text>
          </View>
        </View>
        <ScrollView>
          {deck.questions &&
            deck.questions.map(card => {
              return (
                <Card
                  key={cuid()}
                  card={card}
                  handleDeleteCard={this.handleDeleteCard}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;

  console.log('===> mapStateToProps :: deckId', deckId);
  console.log('===> mapStateToProps :: decks', decks);

  const deck = decks.items[deckId];

  console.log('===> mapStateToProps :: deck', deck);

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps)(Quiz);
