import React from 'react';
import TestRenderer from 'react-test-renderer';
import DeckList from '../DeckList';

it('renders without crashing', () => {
  const DeckListComponent = TestRenderer.create(<DeckList />).toJSON();

  expect(DeckListComponent).toMatchSnapshot();
});

it('displays "loading" message while decks are not loaded', () => {
  const decksMock = {};
  const DeckListComponent = TestRenderer.create(
    <DeckList decks={decksMock} isDecksLoaded={false} />
  ).toJSON();

  expect(DeckListComponent).toMatchSnapshot();
});

it('displays "No Decks available" message if no decks exist', () => {
  const decksMock = {};
  const DeckListComponent = TestRenderer.create(
    <DeckList decks={decksMock} isDecksLoaded={true} />
  ).toJSON();

  expect(DeckListComponent).toMatchSnapshot();
});

it('displays all decks when decks are loaded and exist', () => {
  const decksMock = {
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
  const DeckListComponent = TestRenderer.create(
    <DeckList decks={decksMock} isDecksLoaded={true} />
  ).toJSON();
  expect(DeckListComponent).toMatchSnapshot();
});
