import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'mobileflashcards:deckzz';
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
};

function setDummyData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksData));

  return decksData;
}
export const fetchDecksData = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    console.log(`fetchDecksData [results] ${results}`);
    return results === null ? setDummyData() : JSON.parse(results);
  });
};
