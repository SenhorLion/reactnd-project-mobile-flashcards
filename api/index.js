import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'mobileflashcards:deck';

// {
//   id: '8xf0y6ziyjabvozdd253nd',
//   timestamp: 1467166872634,
//   title: 'Udacity is the best place to learn React',
//   body: 'Everyone says so after all.',
//   author: 'thingtwo',
//   category: 'react',
//   voteScore: 6,
//   deleted: false,
//   commentCount: 2,
// },

const decksData = {
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

const setDummyData = () => {
  console.log('API::@setDummyData');
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksData));

  return decksData;
};

const formatResults = results => {
  console.log('API::@formatResults', results);
  return results ? JSON.parse(results) : setDummyData();
};

export const fetchAllDecks = () => {
  console.log('API::@fetchAllDecks');

  // FOR TESTING: Clear storage
  // AsyncStorage.clear();

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults);
};

export const getDeck = deckId => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const decks = JSON.parse(result);

    return decks[deckId];
  });
};

const asyncFetchAllDecks = () => {
  console.log('API::@asyncFetchAllDecks');

  // FOR TESTING: Clear storage
  // AsyncStorage.clear();

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks =>
    JSON.parse(decks)
  );
};

export const addDeck = deck => {
  console.log('API::addDeck::', JSON.stringify(deck, null, 2));
  // TODO: sanitize data
  const newDeck = {
    [deck.id]: {
      ...deck,
    },
  };

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
};

export const editDeck = (deckId, deck) => {
  console.log('API::editDeck::', deckId, JSON.stringify(deck, null, 2));

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const decks = JSON.parse(result);

    // then update with edited deck
    const updatedDecks = Object.assign({}, decks, {
      ...decks,
      [deckId]: deck,
    });

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDecks));
  });
};

export const deleteDeck = deckId => {
  console.log('API::deleteDeck::', deckId);

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const decks = JSON.parse(result);

    decks[deckId] = undefined;
    delete decks[deckId];

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
};

export const addCardToDeck = (deckId, card) => {
  console.log('API::addCardToDeck::', deckId, card);

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data => {
    const decks = JSON.parse(data);

    const updatedDecks = {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        questions: [...decks[deckId].questions, card],
      },
    };

    return AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify(updatedDecks)
    );
  });
};

/**
 * @function deleteCardFromDeck
 * @param {string} deckId
 * @param {number} cardIndex
 */
export const deleteCardFromDeck = (deckId, cardId) => {
  console.log('API::deleteCardFromDeck::', deckId, cardId);

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
    const decks = JSON.parse(result);

    const filteredCards = decks[deckId].questions.filter(
      card => card.id !== cardId
    );

    const updatedDecks = {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        questions: filteredCards,
      },
    };

    return AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify(updatedDecks)
    );
  });
};
