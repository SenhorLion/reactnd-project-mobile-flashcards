import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { antiFlashWhite, indigo, green, red } from '../../utils/colors';
import { FontAwesome } from '@expo/vector-icons';
import ButtonTouchableOpacity from '../ui/ButtonTouchableOpacity';
import styles from './styles';

const MODES = {
  QUESTION: 'QUESTION',
  ANSWER: 'ANSWER',
};

class QuizCard extends Component {
  state = {
    mode: MODES.QUESTION,
    isQuestionMode: true,
  };

  toggleMode = () => {
    this.setState(prevState => ({
      isQuestionMode: !prevState.isQuestionMode,
    }));
  };

  correctAnswer = () => {
    this.toggleMode();
    this.props.handleCorrectAnswer();
  };

  wrongAnswer = () => {
    this.toggleMode();
    this.props.handleWrongAnswer();
  };

  render() {
    const { card, handleCorrectAnswer, handleWrongAnswer } = this.props;
    const { id, question, answer } = card;
    const { isQuestionMode } = this.state;

    console.log('card:', card);
    console.log('id, question, answer:', id, question, answer);

    return (
      <View style={styles.card}>
        {isQuestionMode ? (
          <View style={styles.question}>
            <Text style={styles.titleText}>{question}</Text>
            <ButtonTouchableOpacity
              backgroundColor={indigo}
              marginTop={10}
              width={150}
              onPress={() => this.toggleMode()}
            >
              <FontAwesome name="plus" size={20} color={antiFlashWhite} />
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                Show Answer
              </Text>
            </ButtonTouchableOpacity>
          </View>
        ) : (
          <View style={styles.answer}>
            <Text style={styles.titleText}>{answer}👋</Text>
            <ButtonTouchableOpacity
              backgroundColor={green}
              marginTop={10}
              width={150}
              onPress={() => this.correctAnswer()}
            >
              <FontAwesome name="plus" size={20} color={antiFlashWhite} />
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                Correct
              </Text>
            </ButtonTouchableOpacity>
            <ButtonTouchableOpacity
              backgroundColor={red}
              marginTop={10}
              width={150}
              onPress={() => this.wrongAnswer()}
            >
              <FontAwesome name="plus" size={20} color={antiFlashWhite} />
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>Wrong</Text>
            </ButtonTouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
QuizCard.propTypes = {
  card: PropTypes.object,
};
export default QuizCard;
