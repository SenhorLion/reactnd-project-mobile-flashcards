import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { AppLoading } from 'expo';
import { fetchDecksData } from '../api';
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
import AppModal from './ui/AppModal';
import { enforcePromiseDelay } from '../utils/helpers';
import Deck from './Deck';
import ErrorBoundary from '../error/ErrorBoundary';

class DeckList extends Component {
  state = {
    modalVisible: false,
    deckSelected: null,
  };

  handleDeleteDeck = deck => {
    console.log('DECK_LIST :: handleDeleteDeck', deck);

    this.setState({ deckSelected: deck }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteDeck = () => {
    const { deckSelected } = this.state;

    this.props.onDeleteDeck(deckSelected.title).then(res => {
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
          <Text dataTestId="loading" style={{ fontSize: 20 }}>
            Loading Decks...
          </Text>;
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
          <Text dataTestId="loading" style={{ fontSize: 20 }}>
            No Decks available to show.
          </Text>;
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
          <View>
            <Text>Delete Deck?</Text>
            <ButtonTouchableOpacity
              width={150}
              backgroundColor={lightPurple}
              onPress={this.confirmDeleteDeck}
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

const styles = StyleSheet.create({
  container: {
    flex: 6,
  },
});

export default DeckList;
