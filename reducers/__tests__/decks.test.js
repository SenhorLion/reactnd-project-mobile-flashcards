import deepFreeze from 'deep-freeze';

import {
  requestAllDecks,
  receiveAllDecks,
  addDeck,
  deleteDeck,
  deleteCard,
  addCard,
} from '../../actions/index';

import decks from '../decks';

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

  it('should return correct data structure for FETCH_DECKS_REQUEST', () => {
    const defaultState = {
      isFetching: true,
      items: {},
    };

    // make sure state is not mutated
    deepFreeze(defaultState);

    const decksPayload = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
          },
        ],
      },
    };

    const expected = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
            },
          ],
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
      title: 'React',
      questions: [],
    };

    const expected = {
      isFetching: false,
      items: {
        React: {
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
        React: {
          title: 'React',
          questions: [],
        },
      },
    };

    deepFreeze(defaultState);

    const deckPayload = {
      title: 'Test',
      questions: [],
    };

    const expected = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [],
        },
        Test: {
          title: 'Test',
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
        React: {
          title: 'React',
          questions: [],
        },
      },
    };

    deepFreeze(defaultState);

    const deckId = 'React';

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
        React: {
          title: 'React',
          questions: [],
        },
      },
    };

    deepFreeze(defaultState);

    // {
    //   question: 'What is React?',
    //   answer: 'A library for managing user interfaces',
    // },
    // {
    //   question: 'Where do you make Ajax requests in React?',
    //   answer: 'The componentDidMount lifecycle event',
    // },

    const deckId = 'React';
    const newCard = {
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
    };

    const expected = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, addCard(deckId, newCard))).toEqual(expected);
  });

  /**
   * DELETE A CARD FROM DECK
   */
  it('should Delete a Card from a Deck wihtout mutating state', () => {
    const defaultState = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    };

    deepFreeze(defaultState);

    const deckId = 'React';
    const cardIndex = 0;

    const expected = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [],
        },
      },
    };

    expect(decks(defaultState, deleteCard(deckId, cardIndex))).toEqual(
      expected
    );
  });

  it('should Delete a Card from a Deck wihtout mutating state', () => {
    const defaultState = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
            },
          ],
        },
      },
    };

    deepFreeze(defaultState);

    const deckId = 'React';
    const cardIndex = 1;

    const expected = {
      isFetching: false,
      items: {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
            },
          ],
        },
      },
    };

    expect(decks(defaultState, deleteCard(deckId, cardIndex))).toEqual(
      expected
    );
  });
});
