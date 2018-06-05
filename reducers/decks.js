import {
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  ADD_CARD,
  ADD_DECK,
} from '../actions/actionTypes';

/**
 * Return all posts in the desired data structure
 *
 * posts: {
 *   isFetching: false,
 *   items: {...}
 * }
 * @function applyFetchPosts
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchDecks = (state, action) => {
  const { decks } = action;

  return Object.assign({}, state, {
    isFetching: false,
    items: Object.values(decks).reduce((decksObj, deck) => {
      decksObj[deck.title] = deck;
      return decksObj;
    }, {}),
  });
};

/**
 * Return fetching state
 *
 * posts: {
 *   isFetching: true,
 *   items: {...}
 * }
 * @function applyFetchDecksRequest
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const applyFetchDecksRequest = (state, action) => {
  return { ...state, isFetching: true };
};

const decks = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DECKS_REQUEST: {
      return applyFetchDecksRequest(state, action);
    }
    case FETCH_DECKS_SUCCESS: {
      return applyFetchDecks(state, action);
    }

    case ADD_DECK: {
      const { deck } = action;
      return Object.assign({}, state, {
        items: {
          ...state.items,
          [deck.title]: deck,
        },
      });
    }

    default:
      return state;
  }
};

export default decks;
