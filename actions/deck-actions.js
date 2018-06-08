import {
  ADD_CARD,
  ADD_DECK,
  DELETE_DECK,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from './actionTypes';

import * as API from '../api';

export const requestAllDecks = () => ({
  type: FETCH_DECKS_REQUEST,
});

export const receiveAllDecks = decks => ({
  type: FETCH_DECKS_SUCCESS,
  decks,
});

export const addDeck = deck => ({
  type: ADD_DECK,
  deck,
});

export const deleteDeck = deckId => ({
  type: DELETE_DECK,
  deckId,
});

export const addCard = card => ({
  type: ADD_CARD,
  card,
});

const fetchAllDecks = () => dispatch => {
  console.log('DECKS_ACTIONS::fetchAllDecks');

  dispatch(requestAllDecks());

  return API.fetchAllDecks().then(decks => {
    console.log('DECKS_ACTIONS::fetchAllDecks.then()', decks);

    return dispatch(receiveAllDecks(decks));
  });
};

const onAddDeck = deck => dispatch => {
  return API.addDeck(deck).then(deckData => {
    return dispatch(addDeck(deck));
  });
};

const onDeleteDeck = deckId => dispatch => {
  return API.deleteDeck(deckId).then(deckData => {
    return dispatch(deleteDeck(deckId));
  });
};

const onAddCard = (title, card) => dispatch => {
  return API.addCardToDeck(title, card).then(cardData => {
    console.log('===\nACTION::onAddCard.then', cardData, '\n===');
    return dispatch(addCard(cardData));
  });
};

export { fetchAllDecks, onAddDeck, onAddCard, onDeleteDeck };
