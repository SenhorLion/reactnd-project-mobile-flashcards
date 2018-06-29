import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import {
  primary,
  primaryLight,
  grey400,
  redA700,
  highlight,
  secondaryLight,
  antiFlashWhite,
} from '../../utils/colors';

import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { InputText } from '../TextInput';
import { IconButton, ButtonTouchableOpacity } from '../Buttons';

const DeckDetailComponent = props => {
  const {
    onHandleEdit,
    onHandleCancelEdit,
    onHandleChangeText,
    onHandleDeleteDeck,
    onSubmitEdit,
    isEditMode,
    deckTitle,
    navigation,
    deck,
    deckId,
  } = props;

  const numOfCards = deck.questions.length;
  const cardsExist = !!numOfCards;

  const navigateToRoute = (route, deck, deckId) =>
    navigation.navigate(route, { deck, deckId });

  return (
    <View style={styles.container}>
      <View>
        {!isEditMode ? (
          <View style={styles.header}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.cardCount}>{`${numOfCards} ${
              numOfCards > 1 ? 'cards' : 'card'
            }`}</Text>
          </View>
        ) : (
          <View style={styles.header}>
            <Text style={styles.title}>Edit Deck title</Text>
            <InputText
              placeholder="Edit title"
              clearButtonMode="while-editing"
              onChangeText={deckTitle => onHandleChangeText(deckTitle)}
              value={deckTitle}
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
                onPress={() => onSubmitEdit()}
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
                onPress={() => onHandleCancelEdit()}
              >
                <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                  Cancel
                </Text>
              </ButtonTouchableOpacity>
            </View>
          </View>
        )}

        {!isEditMode && (
          <View>
            {cardsExist && (
              <View style={styles.row}>
                <ButtonTouchableOpacity
                  marginTop={20}
                  width={150}
                  backgroundColor={primary}
                  onPress={() => navigateToRoute('Quiz', deck, deckId)}
                >
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Start Quiz
                  </Text>
                </ButtonTouchableOpacity>
              </View>
            )}

            <View style={styles.iconButtonRow}>
              {cardsExist && (
                <IconButton
                  visible={true}
                  iconBackground={highlight}
                  icon={
                    <FontAwesome
                      name={`th-list`}
                      size={20}
                      color={antiFlashWhite}
                    />
                  }
                  iconText="View"
                  size={40}
                  onPress={() => navigateToRoute('EditCard', deck, deckId)}
                />
              )}

              <IconButton
                visible={true}
                iconBackground={secondaryLight}
                icon={
                  <FontAwesome name="pencil" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Edit"
                onPress={() => onHandleEdit(deckId)}
              />

              <IconButton
                visible={true}
                iconBackground={primaryLight}
                icon={
                  <FontAwesome name="plus" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Add"
                onPress={() => navigateToRoute('AddCard', deck, deckId)}
              />

              <IconButton
                visible={true}
                iconBackground={redA700}
                icon={
                  <FontAwesome name="trash" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Delete"
                onPress={() => onHandleDeleteDeck(deck)}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default DeckDetailComponent;
