import {
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  ADD_CARD,
  DELETE_CARD,
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

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deck.title]: deck,
    },
  });

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
 * Adds a new card to a deck
 * @function applyAddCardToDeck
 * @param {object} state
 * @param {object} action
 * return {object} new deck
 */
const applyAddCardToDeck = (state, action) => {
  const { entryId, card } = action;

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [entryId]: {
        ...state.items[entryId],
        questions: [...state.items[entryId].questions, card],
      },
    },
  });

  return newDeck;
};
/**
 * Removes a card form a deck
 * @function applyDeleteCardFromDeck
 * @param {object} state
 * @param {object} action
 * return {object}
 */
const applyDeleteCardFromDeck = (state, action) => {
  const { deckId, cardIndex } = action;

  console.log('==> applyDeleteCardFromDeck', state, action);

  const filteredCards = [
    // from the start to the one we want to delete
    ...state.items[deckId].questions.slice(0, cardIndex),
    // after the deleted one, to the end
    ...state.items[deckId].questions.slice(cardIndex + 1),
  ];

  console.log('filteredCards', filteredCards);

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deckId]: {
        ...state.items[deckId],
        questions: filteredCards,
      },
    },
  });
  console.log('newDeck', newDeck);

  return newDeck;
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
      return applyAddCardToDeck(state, action);
    }

    case DELETE_CARD: {
      return applyDeleteCardFromDeck(state, action);
    }

    default:
      return state;
  }
};

export default decks;
