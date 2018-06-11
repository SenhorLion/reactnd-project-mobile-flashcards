import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'mobileflashcards:deck';

const decksData = {
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
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
  Redux: {
    title: 'Redux',
    questions: [
      {
        question: 'What is a state?',
        answer: 'Lorem ipsum dolor sit amec.',
      },
    ],
  },
  Wot: {
    title: 'Wot',
    questions: [
      {
        question: 'What is Wot?',
        answer: 'Lorem ipsum dolor sit amec wot wot wot.',
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
    [deck.title]: {
      ...deck,
    },
  };

  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
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

export const addCardToDeck = (title, card) => {
  console.log('API::addCardToDeck::', title, card);

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data => {
    const decks = JSON.parse(data);

    const updatedDecks = {
      ...decks,
      [title]: {
        ...decks[title],
        questions: [...decks[title].questions, card],
      },
    };

    return AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify(updatedDecks)
    );
  });
};
