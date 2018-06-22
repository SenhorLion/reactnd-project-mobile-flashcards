import React from 'react';
import { connect } from 'react-redux';

import { QuizComponent } from '../components/Quiz';

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;

  const deck = decks.items[deckId];

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps)(QuizComponent);
