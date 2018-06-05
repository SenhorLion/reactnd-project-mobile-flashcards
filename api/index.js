import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'mobileflashcards:deckabc';

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

  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(formatResults);
};

export const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(
    results => (results ? JSON.parse(results) : setDummyData())
  );
