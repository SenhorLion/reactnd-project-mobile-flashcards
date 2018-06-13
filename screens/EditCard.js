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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
    marginTop: 10,
  },
  cardCount: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: gray,
    marginBottom: 10,
  },
});

class EditCard extends Component {
  state = {
    isReady: false,
    modalVisible: false,
    cardSelected: null,
  };

  handleDeleteCard = card => {
    console.log('EDIT_CARD :: handleDeleteCard', card, card.id);

    this.setState({ cardSelected: card }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteCard = () => {
    const { cardSelected } = this.state;
    const { deckId } = this.props.navigation.state.params;

    console.log('deckId', deckId, 'cardId', cardSelected.id);

    this.props
      .onDeleteCard(deckId, cardSelected.id)
      .then(res => {
        this.toggleModalVisible();
        this.clearSelectedDeck();
      })
      .catch(err => console.log('Error: ', err));
  };

  clearSelectedDeck = () => {
    this.setState(prevState => ({
      cardSelected: null,
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
      <View style={styles.container}>
        <View styles={{ flex: 1, padding: 10 }}>
          <Text style={styles.title}>Cards for {deck.title}</Text>
          <Text style={styles.cardCount}>{`${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>
        </View>

        <ScrollView style={styles.container}>
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

export default connect(mapStateToProps, { onDeleteCard })(EditCard);
