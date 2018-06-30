import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { black } from '../../utils/colors';
import AppModal from '../ui/AppModal';
import Deck from './Deck';
import { DeleteModalConfirm } from '../Modals';
import styles from './styles';

class DeckList extends Component {
  state = {
    modalVisible: false,
    deckSelected: null,
  };

  handleDeleteDeck = deck => {
    this.setState({ deckSelected: deck }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteDeck = () => {
    const { deckSelected } = this.state;

    this.props.onDeleteDeck(deckSelected.id).then(res => {
      this.toggleModalVisible();
      this.clearSelectedDeck();
    });
  };

  clearSelectedDeck = () => {
    this.setState(prevState => ({
      deckSelected: null,
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
    const { decks } = this.props;
    const { isFetching, items } = decks;

    const hasDecks = !!(items && Object.keys(items).length);

    if (isFetching) {
      return (
        <View
          style={{
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text dataTestId="loading" style={styles.messageText}>
            Loading Decks...
          </Text>
        </View>
      );
    }

    if (!isFetching && !hasDecks) {
      return (
        <View
          style={{
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text dataTestId="loading" style={styles.messageText}>
            No Decks available to show.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={{ flex: 1 }}>
        {hasDecks &&
          Object.values(items).map(deck => (
            <Deck
              key={deck.title}
              handleDeleteDeck={this.handleDeleteDeck}
              deck={deck}
              {...this.props}
            />
          ))}
        <AppModal
          backdropColor={black}
          isVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          onBackdropPress={this.toggleModalVisible}
        >
          <DeleteModalConfirm
            title="Delete Deck"
            confirmDelete={this.confirmDeleteDeck}
            confirmCancel={this.toggleModalVisible}
          />
        </AppModal>
      </ScrollView>
    );
  }
}

export default DeckList;
