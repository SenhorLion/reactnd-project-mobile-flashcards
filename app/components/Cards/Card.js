import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {
  antiFlashWhite,
  grey400,
  primary,
  primaryLight,
} from '../../utils/colors';
import { IconButton, ButtonTouchableOpacity } from '../Buttons';
import styles from './styles';
import { InputText } from '../TextInput';

class Card extends Component {
  state = {
    isEditMode: false,
    question: '',
    answer: '',
  };

  componentDidMount() {
    const { card: { question, answer } } = this.props;

    this.setState({
      question,
      answer,
    });
  }

  onHandleEdit = () => {
    this.setState({
      isEditMode: true,
    });
  };

  onHandleSaveCard = () => {
    const { question, answer } = this.state;

    if (!answer || !question) {
      console.log('You must enter data to save');
      return;
    }

    const { card, handleSaveCard } = this.props;
    const newCard = {
      ...card,
      question,
      answer,
    };

    handleSaveCard(newCard);
  };

  onHandleCancelEdit = () => {
    const { card: { question, answer } } = this.props;

    this.setState({
      question,
      answer,
      isEditMode: false,
    });

    // this.cancelEdit()
  };

  cancelEdit = () => {
    this.setState({
      isEditMode: false,
    });
  };

  render() {
    const { card, handleDeleteCard } = this.props;
    const { isEditMode, question, answer } = this.state;

    return (
      <View style={styles.card}>
        <View style={styles.cardContainer}>
          {isEditMode ? (
            <View style={styles.editCardContainer}>
              <Text style={styles.title}>Question:</Text>
              <InputText
                placeholder="Edit Question"
                clearButtonMode="while-editing"
                onChangeText={question => this.setState({ question })}
                name="question"
                value={question}
              />
              <Text style={styles.title}>Answer:</Text>
              <InputText
                placeholder="Edit Answer"
                clearButtonMode="while-editing"
                onChangeText={answer => this.setState({ answer })}
                name="answer"
                value={answer}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <ButtonTouchableOpacity
                  marginTop={20}
                  width={150}
                  backgroundColor={primary}
                  onPress={() => this.onHandleSaveCard()}
                >
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Save
                  </Text>
                </ButtonTouchableOpacity>

                <ButtonTouchableOpacity
                  marginTop={20}
                  width={150}
                  backgroundColor={grey400}
                  color={primary}
                  onPress={() => this.onHandleCancelEdit()}
                >
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Cancel
                  </Text>
                </ButtonTouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text>Question: {card.question}</Text>
              <Text>Answer: {card.answer}</Text>

              <View style={styles.iconButtonRow}>
                <IconButton
                  visible={true}
                  iconBackground={primaryLight}
                  icon={
                    <FontAwesome
                      name="pencil"
                      size={20}
                      color={antiFlashWhite}
                    />
                  }
                  size={40}
                  iconText="Edit"
                  onPress={() => this.onHandleEdit(card)}
                />

                <IconButton
                  visible={true}
                  iconBackground={grey400}
                  icon={
                    <FontAwesome
                      name="trash"
                      size={20}
                      color={antiFlashWhite}
                    />
                  }
                  size={40}
                  iconText="Delete"
                  onPress={() => handleDeleteCard(card)}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Card;
