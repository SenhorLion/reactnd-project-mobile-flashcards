import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { black } from '../utils/colors';
import { onEditDeck, onDeleteDeck } from '../actions';
import { DeckDetailComponent } from '../components/DeckDetail';
import AppModal from '../components/ui/AppModal';
import { DeleteModalConfirm } from '../components/Modals';

class DeckDetail extends Component {
  state = {
    isReady: false,
    isEditMode: false,
    deckContent: '',
    deckSelected: null,
    modalVisible: false,
  };

  componentDidMount() {
    const { deck: { title } } = this.props;

    this.setState({
      deckTitle: title,
    });
  }

  onSubmitEdit = event => {
    const { deckTitle } = this.state;

    if (!deckTitle) {
      this.cancelEdit();
      return;
    }

    const { deckId, deck, onEditDeck } = this.props;

    const newDeck = {
      ...deck,
      title: deckTitle,
    };

    onEditDeck(deckId, newDeck).then(res => {
      this.cancelEdit();
    });
  };

  onHandleEdit = deckId => {
    this.setState(prevState => ({
      isEditMode: true,
    }));
  };

  onHandleChangeText = deckTitle => {
    this.setState(prevState => ({
      deckTitle,
    }));
  };

  cancelEdit = () => {
    this.setState(prevState => ({
      isEditMode: false,
    }));
  };

  onHandleCancelEdit = event => {
    // revert deckTitle back to original value
    const { deck: { title } } = this.props;

    this.setState({
      deckTitle: title,
    });

    this.cancelEdit();
  };

  onHandleDeleteDeck = deck => {
    this.setState({ deckSelected: deck }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteDeck = () => {
    const { deckSelected } = this.state;

    this.props.onDeleteDeck(deckSelected.id).then(res => {
      this.closeModal();
      this.clearSelectedDeck();
      this.props.navigation.goBack(null);
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
    const { isEditMode, deckTitle } = this.state;
    const { navigation, deck, deckId } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {deck ? (
          <DeckDetailComponent
            isEditMode={isEditMode}
            deckTitle={deckTitle}
            navigation={navigation}
            deck={deck}
            deckId={deckId}
            onSubmitEdit={this.onSubmitEdit}
            onHandleEdit={this.onHandleEdit}
            onHandleChangeText={this.onHandleChangeText}
            onHandleCancelEdit={this.onHandleCancelEdit}
            onHandleDeleteDeck={this.onHandleDeleteDeck}
          />
        ) : (
          <Text>No Deck exists for {deckId}</Text>
        )}
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

export default connect(mapStateToProps, { onEditDeck, onDeleteDeck })(
  DeckDetail
);
