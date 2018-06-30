# Mobile Flashcards

This is the source code for my final assessment project for Udacity's React Native course. It is an example of knowledge and skills gained in using React Native.

## Project overview

A mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## Why this project?

This project encompasses the fundamental aspects of building a native application including handling infinite lists, routing, and user input. By building this project, you will gain an understanding of how to use React Native to build an iOS and Android application.

## Usage

To view the finished project in a Simulator (ios) / Emulator (android):

- Install all project dependencies from project root:

  - `yarn install` or `npm install`

- Run the build for ios or android:

  - `yarn run ios` or `yarn run android`

  NB: Make sure either Simulator (ios) or Emulator (android) is present and running

To run all tests:

- `yarn test`

**NB: This project has only been tested in both IOS Simulator and Android Emulator. There are some quirks:**

Android Emulator:

- KeyBoardAvoidingView / KeyboardAwareScrollView doesnt seem to function in the Emulator - I need to test this properly and fix if it doesnt actually work on a device! For ios it 'kinda' works but is slow - I'm hoping that is just down to the Simulator...

IOS Simulator:

- I was unable to test the Notification alert for ios as this doesnt 'currently' work for the Simulator.

## Specification

- Use create-react-native-app to build your project.
- Allow users to create a deck which can hold an unlimited number of cards.
- Allow users to add a card to a specific deck.
- The front of the card should display the question.
- The back of the card should display the answer.
- Users should be able to quiz themselves on a specific deck and receive a score once they're done.
- Users should receive a notification to remind themselves to study if they haven't already for that day.

### Views

Your application should have, at a minimum, five views.

- Deck List View (Default View)

  - displays the title of each Deck
  - displays the number of cards in each deck

- Individual Deck View

  - displays the title of the Deck
  - displays the number of cards in the deck
  - displays an option to start a quiz on this specific deck
  - An option to add a new question to the deck

- Quiz View

  - displays a card question
  - an option to view the answer (flips the card)
  - a "Correct" button
  - an "Incorrect" button
  - the number of cards left in the quiz
  - Displays the percentage correct once the quiz is complete

- New Deck View

  - An option to enter in the title for the new deck
  - An option to submit the new deck title

- New Question (Card) View
  - An option to enter in the question
  - An option to enter in the answer
  - An option to submit the new question

### Data

We'll use `AsyncStorage` to store our decks and flashcards. Redux is optional for this project.

Using AsyncStorage you'll manage an object whose shape is similar to this:

```
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```

> NB: Notice each deck creates a new key on the object.
> Each deck has a title and a questions key. title is the title for the specific deck and questions is an array of questions and answers for that deck.

### Tip:

> To manage your AsyncStorage database, you'll want to create four different helper methods.

```JavaScript
getDecks: // return all of the decks along with their titles, questions, and answers.
getDeck: // take in a single id argument and return the deck associated with that id.
saveDeckTitle: // take in a single title argument and add it to the decks.
addCardToDeck: // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
```

## Project scaffold info

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Resources and Attribution

Over the course of the project I researched and used a lot of "external" resources to the course, I list all resources used here that were invaluable for my learning:

- [https://facebook.github.io/react-native/](https://facebook.github.io/react-native/)
- [https://egghead.io/courses/](https://egghead.io/courses/)
- [React Native Basics course :: Handlebar labs](https://learn.handlebarlabs.com/)
