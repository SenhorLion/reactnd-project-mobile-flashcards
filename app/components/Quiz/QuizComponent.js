import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import cuid from 'cuid';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import ButtonTouchableOpacity from '../ui/ButtonTouchableOpacity';
import { antiFlashWhite, indigo } from '../../utils/colors';
import { QuizCard } from '../Cards';

class QuizComponent extends Component {
  state = {
    isComplete: false,
    currentCardIndex: 0,
    correctCount: 0,
    shuffledQuestions: [],
  };

  componentDidMount() {
    const { deck, deckId } = this.props;

    this.setState({
      shuffledQuestions: this.shuffleCards(deck.questions),
    });
  }

  shuffleCards = arr => {
    const cards = [...arr];
    let cardsLength = cards.length - 1;
    let randIndex = 0;
    let tempCard = null;

    while (cardsLength) {
      randIndex = Math.floor(Math.random() * cardsLength);

      tempCard = cards[cardsLength];
      cards[cardsLength] = cards[randIndex];
      cards[randIndex] = tempCard;
      cardsLength--;
    }
    return cards;
  };

  retakeQuiz = () => {
    const { deck } = this.props;

    this.setState({
      isComplete: false,
      currentCardIndex: 0,
      correctCount: 0,
      shuffledQuestions: this.shuffleCards(deck.questions),
    });
  };

  onHandleCorrectAnswer = () => {
    const { currentCardIndex, shuffledQuestions } = this.state;

    if (currentCardIndex === shuffledQuestions.length - 1) {
      this.setState(prevState => ({
        isComplete: true,
        correctCount: prevState.correctCount + 1,
      }));
    } else {
      this.setState(prevState => ({
        currentCardIndex: prevState.currentCardIndex + 1,
        correctCount: prevState.correctCount + 1,
      }));
    }
  };

  onHandleWrongAnswer = () => {
    const { currentCardIndex, shuffledQuestions } = this.state;

    if (currentCardIndex === shuffledQuestions.length - 1) {
      this.setState({
        isComplete: true,
      });
    } else {
      this.setState(prevState => ({
        currentCardIndex: prevState.currentCardIndex + 1,
      }));
    }
  };

  render() {
    const { navigation, deck, deckId } = this.props;
    const {
      isComplete,
      currentCardIndex,
      correctCount,
      shuffledQuestions,
    } = this.state;
    const numOfCards = shuffledQuestions.length;

    const currentCard = shuffledQuestions[currentCardIndex];
    const currentCardNumber = currentCardIndex + 1;
    const percentageCorrect = Math.floor(correctCount / numOfCards * 100);

    return (
      <View style={styles.container}>
        <View style={styles.quizHeader}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text
            style={styles.cardCount}
          >{`${currentCardNumber} of ${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>
        </View>

        <View style={styles.quizBody}>
          {isComplete ? (
            <View style={styles.statsView}>
              <Text>Quiz Complete!</Text>
              <Text>Cards correct: {correctCount}</Text>
              <Text>percentageCorrect: {percentageCorrect}%</Text>
              <ButtonTouchableOpacity
                backgroundColor={indigo}
                marginTop={10}
                width={150}
                onPress={() => this.retakeQuiz()}
              >
                <FontAwesome name="plus" size={20} color={antiFlashWhite} />
                <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                  Retake Quiz
                </Text>
              </ButtonTouchableOpacity>
            </View>
          ) : currentCard ? (
            <View style={styles.quizView}>
              <QuizCard
                card={currentCard}
                handleCorrectAnswer={this.onHandleCorrectAnswer}
                handleWrongAnswer={this.onHandleWrongAnswer}
              />
            </View>
          ) : (
            <View>
              <Text>No currentCard</Text>
            </View>
          )}
        </View>

        <View style={styles.quizFooter}>
          <Text>Percentage Correct: {percentageCorrect}%</Text>
        </View>
      </View>
    );
  }
}

export default QuizComponent;
