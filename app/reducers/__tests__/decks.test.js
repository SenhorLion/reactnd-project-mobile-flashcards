import deepFreeze from 'deep-freeze';
import {
  requestAllDecks,
  receiveAllDecks,
  addDeck,
  editDeck,
  deleteDeck,
  deleteCard,
  addCard,
  editCard,
} from '../../actions/index';
import decks from '../decks';

/**
 * A helper function to handle creating a new deck
 * @function createDeckPayload
 * @return object
 */
const createDeckPayload = () => ({
  cjid9dgxu0000zx8urifcccii: {
    id: 'cjid9dgxu0000zx8urifcccii',
    timestamp: 1528905228099,
    title: 'React',
    questions: [],
  },
});

/**
 * A factory function to handle creating a new deck
 * @function createNewDeck
 * @param {object} deck
 */
const createNewDeck = ({
  id = 'cjid9dgxu0000zx8urifcccii',
  timestamp = 1528905228099,
  title = 'React',
  questions = [],
} = {}) => ({ id, timestamp, title, questions });

/**
 * A factory function to handle creating a new card
 * @function createNewCard
 * @param {object} param0
 */
const createNewCard = ({
  id = 'cjid9dgxu0000zx8urifcccaa',
  question = 'What is React?',
  answer = 'A library for managing user interfaces',
} = {}) => ({ id, question, answer });

/**
 * A factory function to handle default state
 * @function createState
 * @param {object} state
 */
const createState = ({ isFetching = false, items = {} } = {}) => ({
  isFetching,
  items,
});

describe('decks reducer tests', () => {
  it('should handle initial state', () => {
    const defaultState = createState({ isFetching: true });

    expect(decks(undefined, {})).toEqual(defaultState);
  });

  it('should return correct data structure for FETCH_DECKS_REQUEST', () => {
    const defaultState = createState({ isFetching: true });

    expect(decks(undefined, requestAllDecks())).toEqual(defaultState);
  });

  it('should return correct data structure for FETCH_DECKS_SUCCESS', () => {
    const defaultState = createState();

    // make sure state is not mutated
    deepFreeze(defaultState);

    const decksPayload = createDeckPayload();

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [],
        },
      },
    };

    expect(decks(defaultState, receiveAllDecks(decksPayload))).toEqual(
      expected
    );
  });

  /**
   * ADD A DECK
   */
  it('should ADD a Deck wihtout mutating state', () => {
    const defaultState = createState();

    deepFreeze(defaultState);

    const deckPayload = createNewDeck();

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [],
        },
      },
    };

    expect(decks(defaultState, addDeck(deckPayload))).toEqual(expected);
  });

  it('should ADD a new Deck wihtout mutating state', () => {
    const defaultState = createState({
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckPayload = createNewDeck({
      id: 'cjid9dgxx0001zx8ui54qdjuv',
      timestamp: 1528905228099,
      title: 'ES6',
      questions: [],
    });

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
        cjid9dgxx0001zx8ui54qdjuv: {
          id: 'cjid9dgxx0001zx8ui54qdjuv',
          timestamp: 1528905228099,
          title: 'ES6',
          questions: [],
        },
      },
    };

    expect(decks(defaultState, addDeck(deckPayload))).toEqual(expected);
  });

  /**
   * DELETE A DECK
   */
  it('should DELETE a Deck without mutating state', () => {
    const defaultState = createState({
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';

    const expected = {
      isFetching: false,
      items: {},
    };

    expect(decks(defaultState, deleteDeck(deckId))).toEqual(expected);
  });

  /**
   * ADD A CARD TO DECK
   */
  it('should ADD a new Card to a Deck wihtout mutating state', () => {
    const defaultState = createState({
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const card = createNewCard();

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, addCard(deckId, card))).toEqual(expected);
  });

  /**
   * EDIT A CARD
   */
  it('should Edit a Card wihtout mutating state', () => {
    const defaultState = createState({
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';

    const card = createNewCard({
      id: 'cjid9dgxu0000zx8urifcccaa',
      question: 'What is Reaction?',
      answer: 'A library for managing user interfaces view layer',
    });

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is Reaction?',
              answer: 'A library for managing user interfaces view layer',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, editCard(deckId, card))).toEqual(expected);
  });

  it('should Edit a Card wihtout mutating state', () => {
    const defaultState = createState({
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
            {
              id: 'cjid9dgxu0000zx8urifcccbca',
              question: 'What is Redux?',
              answer: 'A library for managing state',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';

    const card = createNewCard({
      id: 'cjid9dgxu0000zx8urifcccbca',
      question: 'What is Reduxy?',
      answer: 'The single source of truth',
    });

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
            {
              id: 'cjid9dgxu0000zx8urifcccbca',
              question: 'What is Reduxy?',
              answer: 'The single source of truth',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, editCard(deckId, card))).toEqual(expected);
  });

  ///

  /**
   * DELETE A CARD FROM DECK
   */
  it('should Delete a Card from a Deck wihtout mutating state', () => {
    const defaultState = createState({
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const cardId = 'cjid9dgxu0000zx8urifcccaa';

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [],
        },
      },
    };

    expect(decks(defaultState, deleteCard(deckId, cardId))).toEqual(expected);
  });

  it('should Delete a Card from a Deck without mutating state', () => {
    const defaultState = createState({
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
            {
              id: 'cjid9dgxu0000zx8urifcccbb',
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const cardId = 'cjid9dgxu0000zx8urifcccaa';

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccbb',
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, deleteCard(deckId, cardId))).toEqual(expected);
  });

  /**
   * EDIT a Deck
   */
  it('should Edit a Deck without mutating state', () => {
    const defaultState = createState({
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'React',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    });

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const deckPayload = createNewDeck({
      id: 'cjid9dgxu0000zx8urifcccii',
      title: 'Reaction',
    });

    const expected = {
      isFetching: false,
      items: {
        cjid9dgxu0000zx8urifcccii: {
          id: 'cjid9dgxu0000zx8urifcccii',
          timestamp: 1528905228099,
          title: 'Reaction',
          questions: [
            {
              id: 'cjid9dgxu0000zx8urifcccaa',
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, editDeck(deckId, deckPayload))).toEqual(
      expected
    );
  });
});
