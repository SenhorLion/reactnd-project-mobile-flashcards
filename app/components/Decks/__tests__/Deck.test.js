import React from 'react';
import TestRenderer from 'react-test-renderer';
import Deck from '../Deck';

it('renders Deck component without crashing', () => {
  const deckMock = {
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
  };
  const DeckComponent = TestRenderer.create(<Deck deck={deckMock} />).toJSON();

  expect(DeckComponent).toMatchSnapshot();
});

it('renders deck when no cards exists', () => {
  const deckMock = {
    title: 'React',
    questions: [],
  };

  const DeckComponent = TestRenderer.create(<Deck deck={deckMock} />).toJSON();

  expect(DeckComponent).toMatchSnapshot();
});
