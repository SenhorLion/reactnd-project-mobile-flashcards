import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { black, primary } from '../utils/colors';
import { Card } from '../components/Cards';
import AppModal from '../components/ui/AppModal';
import { onDeleteCard, onEditCard } from '../actions';
import { DeleteModalConfirm } from '../components/Modals';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
    color: primary,
    marginTop: 20,
  },
  cardCount: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 22,
    color: primary,
    marginBottom: 10,
  },
});

class EditCard extends Component {
  state = {
    isReady: false,
    modalVisible: false,
    cardSelected: null,
  };

  handleSaveCard = card => {
    console.log('EDIT_CARD :: handleSaveCard\n\t', card);

    const { deckId, onEditCard } = this.props;
    console.log('\tDECK_ID', this.props.deckId);

    onEditCard(deckId, card);
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
                  handleSaveCard={this.handleSaveCard}
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
          <DeleteModalConfirm
            title="Delete Card"
            confirmDelete={this.confirmDeleteCard}
            confirmCancel={this.toggleModalVisible}
          />
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

// TODO: Add onEditCard action
export default connect(mapStateToProps, { onDeleteCard, onEditCard })(EditCard);
