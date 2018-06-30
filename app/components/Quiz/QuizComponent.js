import React, { Component } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { antiFlashWhite, primary, grey400, redA700 } from '../../utils/colors';
import {
  getRandomMessage,
  setLocalNotification,
  clearLocalNotifications,
} from '../../utils/helpers';

import { IconButton, ButtonTouchableOpacity } from '../Buttons';

class QuizComponent extends Component {
  static navigationOptions = {
    title: 'Back',
  };

  state = {
    isComplete: false,
    isQuestion: true,
    currentCardIndex: 0,
    correctCount: 0,
    shuffledQuestions: [],
    quizCompleteMessage: '',
  };

  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
    this.value = 0;

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  componentDidMount() {
    const { deck, deckId } = this.props;

    this.setState({
      shuffledQuestions: this.shuffleCards(deck.questions),
    });

    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

  componentWillUnmount() {
    // Clean up Animated listeners!
    this.animatedValue.removeAllListeners();
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

    // make sure card starts in correct orientation
    if (this.value >= 90) {
      this.flipCard();
    }

    // then reset state
    this.setState({
      isComplete: false,
      isQuestion: true,
      currentCardIndex: 0,
      correctCount: 0,
      shuffledQuestions: this.shuffleCards(deck.questions),
      quizCompleteMessage: '',
    });
  };

  isGameComplete = () => {
    const { currentCardIndex, shuffledQuestions } = this.state;
    return currentCardIndex === shuffledQuestions.length - 1;
  };

  onHandleCorrectAnswer = () => {
    this.setState(
      prevState => ({
        correctCount: prevState.correctCount + 1,
      }),
      () => this.onProgressToNextCard()
    );
  };

  onProgressToNextCard = () => {
    if (this.isGameComplete()) {
      this.onGameComplete();
    } else {
      this.toggleQuestion();
      this.setState(prevState => ({
        currentCardIndex: prevState.currentCardIndex + 1,
        isQuestion: true,
      }));
    }
  };

  onGameComplete = () => {
    const { correctCount, shuffledQuestions } = this.state;

    const numOfCards = shuffledQuestions.length;
    const percentageCorrect = Math.floor(correctCount / numOfCards * 100);
    const quizCompleteMessage = getRandomMessage(percentageCorrect);

    this.setState({
      isComplete: true,
      quizCompleteMessage,
      percentageCorrect,
    });

    clearLocalNotifications().then(setLocalNotification);
  };

  renderQuizCompleteHeader = () => {
    return (
      <View>
        <Text style={styles.subTitle}>Quiz Completed!</Text>
      </View>
    );
  };

  renderPercentComplete = () => {
    const { correctCount, shuffledQuestions } = this.state;

    const percentageCorrect = Math.floor(
      correctCount / shuffledQuestions.length * 100
    );

    return `${percentageCorrect}%`;
  };

  renderQuizCompleteStats = () => {
    const {
      correctCount,
      percentageCorrect,
      shuffledQuestions,
      quizCompleteMessage,
    } = this.state;
    const numOfCards = shuffledQuestions.length;

    const messageStyles = [styles.completeMessage];
    const statsStyles = [styles.statsText];

    if (percentageCorrect < 100) {
      messageStyles.push({
        color: redA700,
      });
      statsStyles.push({
        color: redA700,
      });
    }

    return (
      <View style={styles.statsView}>
        <Text style={messageStyles}>{quizCompleteMessage}</Text>
        <Text
          style={statsStyles}
        >{`${correctCount} out of ${numOfCards} correct`}</Text>
        <Text style={[statsStyles, styles.statsTextHeavy]}>
          {this.renderPercentComplete()}
        </Text>
      </View>
    );
  };

  renderInQuizStats = () => {
    const { currentCardIndex, shuffledQuestions } = this.state;
    const numOfCards = shuffledQuestions.length;
    const currentCardNumber = currentCardIndex + 1;
    return (
      <View>
        <Text style={styles.subTitle}>{`${currentCardNumber} of ${numOfCards} ${
          numOfCards > 1 ? 'cards' : 'card'
        }`}</Text>
      </View>
    );
  };

  renderFooterStats = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subTitle}>{this.renderPercentComplete()}</Text>
      </View>
    );
  };

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start();
    }
  };

  toggleQuestion = () => {
    this.flipCard();

    this.setState(prevState => ({
      isQuestion: !prevState.isQuestion,
    }));
  };

  render() {
    const { navigation, deck, deckId } = this.props;
    const {
      isComplete,
      currentCardIndex,
      shuffledQuestions,
      isQuestion,
    } = this.state;

    const currentCard = shuffledQuestions[currentCardIndex];

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    };

    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    };

    // Hack Alert:
    // To get around Android not supporting `backfaceVisibility`
    // we add an opacity value to show / hide the relevant card,
    // AND In addition, to cope with IOS getting all janky with `opacity`
    // we only add it for Android
    // TODO: Add a nicer fadeIn / fadeOut animation...
    if (Platform.OS === 'android') {
      frontAnimatedStyle['opacity'] = isQuestion ? 1 : 0;
      backAnimatedStyle['opacity'] = isQuestion ? 0 : 1;
    }

    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
      >
        <View style={[styles.topContainer, {}]}>
          <Text style={styles.title}>{deck.title}</Text>
          {isComplete
            ? this.renderQuizCompleteHeader()
            : this.renderInQuizStats()}
        </View>

        <View style={styles.cardContainer}>
          {isComplete ? (
            this.renderQuizCompleteStats()
          ) : currentCard ? (
            <View>
              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <View style={styles.cardContent}>
                  <Text style={styles.questionText}>
                    Q: {currentCard.question}
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                style={[styles.card, styles.cardBack, backAnimatedStyle]}
              >
                <View style={styles.cardContent}>
                  <Text style={[styles.questionText, styles.answerText]}>
                    A: {currentCard.answer}
                  </Text>
                </View>
              </Animated.View>
            </View>
          ) : (
            <View>
              <Text>No currentCard</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          {isComplete ? (
            <View>
              <ButtonTouchableOpacity
                backgroundColor={primary}
                marginTop={10}
                width={150}
                onPress={() => this.retakeQuiz()}
              >
                <FontAwesome name="backward" size={20} color={antiFlashWhite} />
                <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                  Retake Quiz
                </Text>
              </ButtonTouchableOpacity>
            </View>
          ) : isQuestion ? (
            <ButtonTouchableOpacity
              backgroundColor={primary}
              marginTop={10}
              width={180}
              onPress={() => this.toggleQuestion()}
            >
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                Show Answer
              </Text>
            </ButtonTouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                visible={true}
                iconBackground={grey400}
                icon={
                  <FontAwesome
                    name="backward"
                    size={20}
                    color={antiFlashWhite}
                  />
                }
                size={40}
                marginTop={6}
                onPress={() => this.toggleQuestion()}
              />

              <ButtonTouchableOpacity
                backgroundColor={primary}
                marginTop={10}
                width={100}
                onPress={() => this.onHandleCorrectAnswer()}
              >
                <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                  Correct
                </Text>
              </ButtonTouchableOpacity>
              <ButtonTouchableOpacity
                backgroundColor={redA700}
                marginTop={10}
                width={100}
                onPress={() => this.onProgressToNextCard()}
              >
                <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                  Incorrect
                </Text>
              </ButtonTouchableOpacity>
            </View>
          )}
          {!isComplete && this.renderFooterStats()}
        </View>
      </View>
    );
  }
}

export default QuizComponent;
