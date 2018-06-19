import React, { Component } from 'react';
import { connect } from 'react-redux';

import { onEditDeck } from '../actions';
import { DeckDetailComponent } from '../components/DeckDetail';

class DeckDetail extends Component {
  state = {
    isReady: false,
    isEditMode: false,
    deckContent: '',
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
    console.log('@onHandleChangeText', deckTitle);
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

  render() {
    const { isEditMode, deckTitle } = this.state;
    const { navigation, deck, deckId } = this.props;

    return (
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
      />
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

export default connect(mapStateToProps, { onEditDeck })(DeckDetail);
