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

export const addCard = (entryId, card) => ({
  type: ADD_CARD,
  entryId,
  card,
});

const fetchAllDecks = () => dispatch => {
  dispatch(requestAllDecks());

  return API.fetchAllDecks().then(decks => {
    return dispatch(receiveAllDecks(decks));
  });
};

// TODO: sanitize ALL data
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

const onAddCard = (entryId, card) => dispatch => {
  return API.addCardToDeck(entryId, card).then(cardData => {
    return dispatch(addCard(entryId, card));
  });
};

export { fetchAllDecks, onAddDeck, onAddCard, onDeleteDeck };
