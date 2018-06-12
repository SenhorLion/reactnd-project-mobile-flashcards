import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import cuid from 'cuid';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';
import Card from '../components/Card';
import AppModal from '../components/ui/AppModal';
import { onDeleteCard } from '../actions';

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

class EditCard extends Component {
  state = {
    isReady: false,
    modalVisible: false,
    cardSelected: null,
    cardIndex: null,
  };

  handleDeleteCard = (card, cardIndex) => {
    console.log('EDIT_CARD :: handleDeleteCard', card, cardIndex);

    this.setState({ cardSelected: card, cardIndex }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteCard = () => {
    const { cardSelected, cardIndex } = this.state;
    const { deckId } = this.props.navigation.state.params;

    console.log('deckId', deckId, 'cardIndex', cardIndex);

    this.props
      .onDeleteCard(deckId, cardIndex)
      .then(res => {
        this.toggleModalVisible();
        this.clearSelectedDeck();
      })
      .catch(err => console.log('Error: ', err));
  };

  clearSelectedDeck = () => {
    this.setState(prevState => ({
      cardSelected: null,
      cardIndex: null,
    }));
  };

  toggleModalVisible = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { navigation, deck, deckId } = this.props;
    const numOfCards = deck.questions.length;

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>deckId - {deckId}</Text>
          <Text style={styles.title}>Edit: {deck.title}</Text>
          <Text style={styles.cardCount}>{`${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>
        </View>

        {deck.questions &&
          deck.questions.map((card, index) => {
            return (
              <Card
                key={cuid()}
                cardIndex={index}
                card={card}
                handleDeleteCard={this.handleDeleteCard}
              />
            );
          })}

        <AppModal
          backdropColor={black}
          isVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          onBackdropPress={this.toggleModalVisible}
        >
          <View>
            <Text>Delete Card?</Text>
            <ButtonTouchableOpacity
              width={150}
              backgroundColor={lightPurple}
              onPress={this.confirmDeleteCard}
            >
              <Text>Delete</Text>
            </ButtonTouchableOpacity>

            <ButtonTouchableOpacity
              width={150}
              backgroundColor={gray}
              onPress={this.toggleModalVisible}
            >
              <Text>Cancel</Text>
            </ButtonTouchableOpacity>
          </View>
        </AppModal>
      </ScrollView>
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

export default connect(mapStateToProps, { onDeleteCard })(EditCard);
