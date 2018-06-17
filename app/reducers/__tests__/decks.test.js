import deepFreeze from 'deep-freeze';
import cuid from 'cuid';
import {
  requestAllDecks,
  receiveAllDecks,
  addDeck,
  editDeck,
  deleteDeck,
  deleteCard,
  addCard,
} from '../../actions/index';

import decks from '../decks';

const defaultDecksData = {
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
  cjid9dgxx0001zx8ui54qdjuv: {
    id: 'cjid9dgxx0001zx8ui54qdjuv',
    timestamp: 1528905210982,
    title: 'JavaScript',
    questions: [
      {
        id: 'cjid9dgxu0000zx8urifcccdd',
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
  cjid9dgy00002zx8uasq10rav: {
    id: 'cjid9dgy00002zx8uasq10rav',
    timestamp: 1528905242807,
    title: 'Redux',
    questions: [
      {
        id: 'cjid9dgxu0000zx8urifcccee',
        question: 'What is a state?',
        answer: 'Lorem ipsum dolor sit amec.',
      },
    ],
  },
};

describe('decks reducer tests', () => {
  it('should handle initial state', () => {
    const defaultState = {
      isFetching: true,
      items: {},
    };
    expect(decks(undefined, {})).toEqual(defaultState);
  });

  it('should return correct data structure for FETCH_DECKS_REQUEST', () => {
    const defaultState = {
      isFetching: true,
      items: {},
    };
    expect(decks(undefined, requestAllDecks())).toEqual(defaultState);
  });

  it('should return correct data structure for FETCH_DECKS_SUCCESS', () => {
    const defaultState = {
      isFetching: true,
      items: {},
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const decksPayload = {
      cjid9dgxu0000zx8urifcccii: {
        id: 'cjid9dgxu0000zx8urifcccii',
        timestamp: 1528905228099,
        title: 'React',
        questions: [],
      },
    };

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
    const defaultState = {
      isFetching: false,
      items: {},
    };

    deepFreeze(defaultState);

    const deckPayload = {
      id: 'cjid9dgxu0000zx8urifcccii',
      timestamp: 1528905228099,
      title: 'React',
      questions: [],
    };

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
    const defaultState = {
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

    deepFreeze(defaultState);

    const deckPayload = {
      id: 'cjid9dgxx0001zx8ui54qdjuv',
      timestamp: 1528905228099,
      title: 'ES6',
      questions: [],
    };

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
    const defaultState = {
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
    const defaultState = {
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

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const card = {
      id: 'cjid9dgxu0000zx8urifcccaa',
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
    };

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
   * DELETE A CARD FROM DECK
   */
  it('should Delete a Card from a Deck wihtout mutating state', () => {
    const defaultState = {
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
    const defaultState = {
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
              id: 'cjid9dgxu0000zx8urifcccbb',
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
            },
          ],
        },
      },
    };

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
    const defaultState = {
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

    deepFreeze(defaultState);

    const deckId = 'cjid9dgxu0000zx8urifcccii';
    const deckPayload = {
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
    };

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
