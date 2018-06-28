import {
  FETCH_DECKS_REQUEST,
  FETCH_DECKS_SUCCESS,
  ADD_CARD,
  EDIT_CARD,
  EDIT_DECK,
  DELETE_CARD,
  ADD_DECK,
  DELETE_DECK,
} from '../actions/actionTypes';

/**
 * Return all posts in the desired data structure
 *
 * Received data:
 * =====
 * cjid9dgxu0000zx8urifcccii: {
 *   id: 'cjid9dgxu0000zx8urifcccii',
 *   timestamp: 1528905228099,
 *   title: 'React',
 *   questions: [
 *     {
 *       id: 'cjid9dgxu0000zx8urifcccaa',
 *       question: 'What is React?',
 *       answer: 'A library for managing user interfaces',
 *     },
 *   ],
 * };
 *
 * Desired data format:
 * =====
 * decks: {
 *   isFetching: false,
 *    items: {
 *      cjid9dgxu0000zx8urifcccii: {
 *        id: 'cjid9dgxu0000zx8urifcccii',
 *        timestamp: 1528905228099,
 *        title: 'React',
 *        questions: [
 *          {
 *            id: 'cjid9dgxu0000zx8urifcccaa',
 *            question: 'What is React?',
 *            answer: 'A library for managing user interfaces',
 *          },
 *        ],
 *      },
 *    },
 * }
 *
 * @function applyFetchPosts
 * @param {Object} state
 * @param {Object} action
 * @return {Object} new state
 */
const applyFetchDecks = (state, action) => {
  const { decks } = action;

  return Object.assign({}, state, {
    isFetching: false,
    items: Object.values(decks).reduce((decksObj, deck) => {
      decksObj[deck.id] = deck;
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
 *
 * expected payload:
 * deck: {
 *   id: 'cjid9dgxu0000zx8urifcccii',
 *   timestamp: 1528905228099,
 *   title: 'React',
 *   questions: [],
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
      [deck.id]: deck,
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
  const { deckId, card } = action;

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deckId]: {
        ...state.items[deckId],
        questions: [...state.items[deckId].questions, card],
      },
    },
  });

  return newDeck;
};

/**
 * Remove a card from a deck
 * @function applyDeleteCardFromDeck
 * @param {object} state
 * @param {object} action
 * return {object}
 */
const applyDeleteCardFromDeck = (state, action) => {
  const { deckId, cardId } = action;

  const filteredCards = state.items[deckId].questions.filter(
    card => card.id !== cardId
  );

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deckId]: {
        ...state.items[deckId],
        questions: filteredCards,
      },
    },
  });

  return newDeck;
};

/**
 * Edit a deck
 * @function applyEditDeck
 * @param {object} state
 * @param {object} action
 * return {object} new state
 */
const applyEditDeck = (state, action) => {
  const { deckId, deck } = action;

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deckId]: { ...deck },
    },
  });

  return newDeck;
};

/**
 * Edit a card
 * @function applyEditCard
 * @param {object} state
 * @param {object} action
 * return {object} new state
 */
const applyEditCard = (state, action) => {
  const { deckId } = action;

  const updatedQuestions = state.items[deckId].questions.map(card => {
    if (card.id === action.card.id) {
      return action.card;
    }
    return card;
  });

  const newDeck = Object.assign({}, state, {
    items: {
      ...state.items,
      [deckId]: {
        ...state.items[deckId],
        questions: updatedQuestions,
      },
    },
  });

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

    case EDIT_CARD: {
      return applyEditCard(state, action);
    }

    case EDIT_DECK: {
      return applyEditDeck(state, action);
    }

    case DELETE_CARD: {
      return applyDeleteCardFromDeck(state, action);
    }

    default:
      return state;
  }
};

export default decks;
