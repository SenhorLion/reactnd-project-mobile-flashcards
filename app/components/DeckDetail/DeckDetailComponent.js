import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import {
  gray,
  lightGray,
  green,
  indigo,
  lightGreen,
  amber,
  cyan,
  grey400,
  purple,
  lightPurple,
  antiFlashWhite,
} from '../../utils/colors';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ButtonTouchableOpacity from '../ui/ButtonTouchableOpacity';
import ButtonIcon from '../ui/ButtonIcon';
import styles from './styles';
import { InputText } from '../TextInput';
import { IconButton } from '../Buttons';

const DeckDetailComponent = props => {
  const {
    onHandleEdit,
    onHandleCancelEdit,
    onHandleChangeText,
    onSubmitEdit,
    isEditMode,
    deckTitle,
    navigation,
    deck,
    deckId,
  } = props;
  const numOfCards = deck.questions.length;
  const navigateToRoute = (route, deck, deckId) =>
    navigation.navigate(route, { deck, deckId });

  return (
    <View style={styles.container}>
      <View>
        {!isEditMode ? (
          <View style={{ alignItems: 'center', padding: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            />
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.cardCount}>{`${numOfCards} ${
              numOfCards > 1 ? 'cards' : 'card'
            }`}</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 10 }}>
            <Text>Edit Deck title</Text>
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
                backgroundColor={indigo}
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
                color={gray}
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
            {numOfCards && (
              <View style={styles.row}>
                <ButtonTouchableOpacity
                  marginTop={20}
                  width={150}
                  backgroundColor={indigo}
                  onPress={() => navigateToRoute('Quiz', deck, deckId)}
                >
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Start Quiz
                  </Text>
                </ButtonTouchableOpacity>
              </View>
            )}

            <View style={styles.iconButtonRow}>
              {numOfCards && (
                <IconButton
                  visible={true}
                  iconBackground={amber}
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
                iconBackground={lightPurple}
                icon={
                  <FontAwesome name="pencil" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Edit"
                onPress={() => onHandleEdit(deckId)}
              />

              <IconButton
                visible={true}
                iconBackground={cyan}
                icon={
                  <FontAwesome name="plus" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Add"
                onPress={() => navigateToRoute('AddCard', deck, deckId)}
              />

              <IconButton
                visible={true}
                iconBackground={grey400}
                icon={
                  <FontAwesome name="trash" size={20} color={antiFlashWhite} />
                }
                size={40}
                iconText="Delete"
                onPress={() => console.log('@DELETE DECK', deckId)}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default DeckDetailComponent;
