import {
  ADD_CARD,
  DELETE_CARD,
  ADD_DECK,
  EDIT_DECK,
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

export const editDeck = (deckId, deck) => ({
  type: EDIT_DECK,
  deckId,
  deck,
});

export const deleteDeck = deckId => ({
  type: DELETE_DECK,
  deckId,
});

export const addCard = (deckId, card) => ({
  type: ADD_CARD,
  deckId,
  card,
});

export const deleteCard = (deckId, cardId) => ({
  type: DELETE_CARD,
  deckId,
  cardId,
});

const fetchAllDecks = () => dispatch => {
  dispatch(requestAllDecks());

  return API.fetchAllDecks().then(decks => {
    return dispatch(receiveAllDecks(decks));
  });
};

const onAddDeck = deck => dispatch => {
  return API.addDeck(deck).then(deckData => {
    return dispatch(addDeck(deck));
  });
};

const onEditDeck = (deckId, deck) => dispatch => {
  console.log('ACTION::onEditDeck::', deckId, JSON.stringify(deck, null, 2));

  return API.editDeck(deckId, deck).then(deckData => {
    return dispatch(editDeck(deckId, deck));
  });
};

const onDeleteDeck = deckId => dispatch => {
  return API.deleteDeck(deckId).then(deckData => {
    return dispatch(deleteDeck(deckId));
  });
};

const onAddCard = (deckId, card) => dispatch => {
  return API.addCardToDeck(deckId, card).then(cardData => {
    return dispatch(addCard(deckId, card));
  });
};

const onDeleteCard = (deckId, cardId) => dispatch => {
  return API.deleteCardFromDeck(deckId, cardId).then(cardData => {
    return dispatch(deleteCard(deckId, cardId));
  });
};

export {
  fetchAllDecks,
  onAddDeck,
  onEditDeck,
  onAddCard,
  onDeleteDeck,
  onDeleteCard,
};
