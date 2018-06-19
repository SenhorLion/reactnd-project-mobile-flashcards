import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ButtonTouchableOpacity from './ui/ButtonTouchableOpacity';
import {
  purple,
  lightPurple,
  grey400,
  gray,
  antiFlashWhite,
} from '../utils/colors';
import { IconButton } from './Buttons';

const CARD_MODES = {
  QUIZ: 'quiz',
  VIEW: 'view',
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: antiFlashWhite,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    minHeight: 100,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: purple,
  },
  subText: {
    textAlign: 'center',
    fontSize: 20,
    color: gray,
  },
  iconButtonRow: {
    flexDirection: 'row',
  },
});

class Card extends Component {
  state = {
    mode: CARD_MODES.VIEW,
    isEditMode: false,
  };

  onHandleEdit = () => {
    this.setState(prevState => ({
      isEditMode: true,
    }));
  };
  onHandleCancelEdit = () => {
    this.setState(prevState => ({
      isEditMode: false,
    }));
  };

  onToggleEdit = () => {
    const { card } = this.props;
    console.log('@onToggleEdit', this.state.isEditMode, 'card: ', card.id);

    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode,
    }));
  };

  render() {
    const { card, handleDeleteCard } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.cardContainer}>
          <Text>Question: {card.question}</Text>
          <Text>Answer: {card.answer}</Text>

          <View style={styles.iconButtonRow}>
            <IconButton
              visible={true}
              iconBackground={lightPurple}
              icon={
                <FontAwesome name="pencil" size={20} color={antiFlashWhite} />
              }
              size={40}
              iconText="Edit"
              onPress={() => this.onToggleEdit()}
            />

            <IconButton
              visible={true}
              iconBackground={grey400}
              icon={
                <FontAwesome name="trash" size={20} color={antiFlashWhite} />
              }
              size={40}
              iconText="Delete"
              onPress={() => handleDeleteCard(card)}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Card;
