import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
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
      // TODO: Add notification to user
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
        {isEditMode ? (
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.editCardContainer}>
              <Text style={styles.editLabel}>Question:</Text>
              <InputText
                placeholder="Edit Question"
                clearButtonMode="while-editing"
                onChangeText={question => this.setState({ question })}
                name="question"
                value={question}
              />
              <Text style={styles.editLabel}>Answer:</Text>
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
          </KeyboardAvoidingView>
        ) : (
          <View
            style={[
              styles.cardContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: 30,

                padding: 2,
                backgroundColor: primaryLight,
              }}
            >
              <Text style={{ textAlign: 'center', color: antiFlashWhite }}>
                {this.props.index}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 30,
                padding: 5,
              }}
            >
              <View
                style={{
                  alignSelf: 'baseline',
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
              >
                <Text>Question: {card.question}</Text>
                <Text>Answer: {card.answer}</Text>
              </View>

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
                  onPress={() => handleDeleteCard(card)}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Card;
