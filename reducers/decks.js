import {
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  ADD_CARD,
  ADD_DECK,
  DELETE_DECK,
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

  console.log('==> applyFetchDecks :: state: ', state, 'action: ', action);

  return Object.assign({}, state, {
    isFetching: false,
    items: Object.values(decks).reduce((decksObj, deck) => {
      decksObj[deck.title] = deck;
      return decksObj;
    }, {}),
  });
};

/**
 * Return decks fetching state
 *
 * decks: {
 *   isFetching: true,
 *   items: {...}
 * }
 * @function applyFetchDecksRequest
 * @param {Object} state
 * @param {Object} action
 * @return {Object} new state
 */
const applyFetchDecksRequest = (state, action) => {
  console.log(
    '==> applyFetchDecksRequest :: state: ',
    state,
    'action: ',
    action
  );
  return { ...state, isFetching: true };
};

/**
 * Add a Deck to state
 * expected action.deck payload
 * deck: {
 *   title: 'title',
 *   questions: []
 * }
 *
 * @function applyAddDeck
 * @param {state} state
 * @param {action} action
 */
const applyAddDeck = (state, action) => {
  const { deck } = action;
  console.log('==> applyAddDeck :: ', 'state:', state, 'action:', action);

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deck.title]: deck,
    },
  });
  console.log('\tnewDeck', newDeck);

  return newDeck;
};

/**
 * Delete a Deck form state
 *
 * @function applyDeleteDeck
 * @param {state} state
 * @param {action} action
 */
const applyDeleteDeck = (state, action) => {
  const filterDecks = Object.keys(state.items)
    .filter(deckId => deckId !== action.deckId)
    .reduce((decks, id) => {
      decks[id] = state.items[id];
      return decks;
    }, {});

  return Object.assign({}, state, {
    items: filterDecks,
  });
};

/**
 * Default Deck state
 */
const defaultState = {
  isFetching: true,
  items: {},
};

const decks = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_DECKS_REQUEST: {
      return applyFetchDecksRequest(state, action);
    }

    case FETCH_DECKS_SUCCESS: {
      return applyFetchDecks(state, action);
    }

    case ADD_DECK: {
      return applyAddDeck(state, action);
    }

    case DELETE_DECK: {
      return applyDeleteDeck(state, action);
    }

    case ADD_CARD: {
      const { entryId, card } = action;

      console.log('==> ADD_CARD', state, action);

      const newDeck = Object.assign({}, state, {
        items: {
          ...state.items,
          [entryId]: {
            ...state.items[entryId],
            questions: [...state.items[entryId].questions, card],
          },
        },
      });

      console.log('\tnewDeckzzz', newDeck);

      return newDeck;
    }

    default:
      return state;
  }
};

export default decks;
