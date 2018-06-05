import {
  ADD_CARD,
  ADD_DECK,
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
} from './actionTypes';

import * as API from '../api';

const requestAllDecks = () => ({
  type: FETCH_DECKS_REQUEST,
});

const receiveAllDecks = decks => ({
  type: FETCH_DECKS_SUCCESS,
  decks,
});

export const addDeck = deck => ({
  type: ADD_DECK,
  deck,
});

const fetchAllDecks = () => dispatch => {
  console.log('DECKS_ACTIONS::fetchAllDecks');

  dispatch(requestAllDecks());

  return API.fetchAllDecks().then(decks => {
    console.log('DECKS_ACTIONS::fetchAllDecks.then()', decks);

    return dispatch(receiveAllDecks(decks));
  });
};

export { fetchAllDecks };
