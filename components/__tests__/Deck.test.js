import React from 'react';
import TestRenderer from 'react-test-renderer';
import Deck from '../Deck';

it('renders Deck component without crashing', () => {
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
  const DeckComponent = TestRenderer.create(<Deck deck={decksMock} />).toJSON();

  expect(DeckComponent).toMatchSnapshot();
});

it.only('renders no deck avaialble message when no deck exists', () => {
  const decksMock = {};
  const DeckComponent = TestRenderer.create(<Deck deck={decksMock} />).toJSON();

  expect(DeckComponent).toMatchSnapshot();
});
