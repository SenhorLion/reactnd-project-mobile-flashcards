import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';
import ButtonIcon from '../components/ui/ButtonIcon';
import { onEditDeck } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
  },
  cardCount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: gray,
  },
  textInput: {
    margin: 10,
    padding: 15,
    height: 50,
    backgroundColor: antiFlashWhite,
    borderRadius: 3,
    color: black,
  },
});

class DeckDetail extends Component {
  state = {
    isReady: false,
    isEditMode: false,
    deckContent: '',
  };

  componentDidMount() {
    const { deck: { title } } = this.props;

    this.setState({
      deckTitle: title,
    });
  }

  onSubmitEdit = event => {
    const { deckTitle } = this.state;

    if (!deckTitle) {
      this.cancelEdit();
      return;
    }

    const { deckId, deck, onEditDeck } = this.props;

    const newDeck = {
      ...deck,
      title: deckTitle,
    };

    onEditDeck(deckId, newDeck).then(res => {
      this.cancelEdit();
    });
  };

  onHandleEdit = deckId => {
    this.setState(prevState => ({
      isEditMode: true,
    }));
  };

  cancelEdit = () => {
    this.setState(prevState => ({
      isEditMode: false,
    }));
  };

  onHandleCancelEdit = event => {
    this.cancelEdit();
  };

  render() {
    const { isEditMode, deckTitle } = this.state;
    const { navigation, deck, deckId } = this.props;
    const numOfCards = deck.questions.length;

    return (
      <View style={styles.container}>
        <View>
          {!isEditMode ? (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.title}>{deck.title}</Text>
                <ButtonIcon
                  color={gray}
                  icon="edit"
                  onPress={() => this.onHandleEdit(deckId)}
                />
              </View>
              <Text style={styles.cardCount}>{`${numOfCards} ${
                numOfCards > 1 ? 'cards' : 'card'
              }`}</Text>
            </View>
          ) : (
            <View style={{ padding: 10 }}>
              <Text>Edit Deck title</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder="Edit title"
                placeholderTextColor={black}
                onChangeText={deckTitle => this.setState(() => ({ deckTitle }))}
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
                  backgroundColor={purple}
                  onPress={() => {
                    console.log('Edit deck');
                    this.onSubmitEdit();
                  }}
                >
                  <FontAwesome name="edit" size={20} color={antiFlashWhite} />
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Save Edit
                  </Text>
                </ButtonTouchableOpacity>

                <ButtonTouchableOpacity
                  marginTop={20}
                  width={150}
                  backgroundColor={lightPurple}
                  onPress={() => {
                    console.log('Edit deck');
                    this.onHandleCancelEdit();
                  }}
                >
                  <FontAwesome name="edit" size={20} color={antiFlashWhite} />
                  <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                    Cancel
                  </Text>
                </ButtonTouchableOpacity>
              </View>
            </View>
          )}

          {numOfCards && (
            <ButtonTouchableOpacity
              marginTop={20}
              width={150}
              backgroundColor={gray}
              onPress={() => {
                console.log('Edit Card navigate');
                navigation.navigate('EditCard', { deck, deckId });
              }}
            >
              <FontAwesome name="edit" size={20} color={antiFlashWhite} />
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                View Cards
              </Text>
            </ButtonTouchableOpacity>
          )}
          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={lightPurple}
            onPress={() => {
              console.log('Add Card navigate');
              navigation.navigate('AddCard', { deck, deckId });
            }}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </ButtonTouchableOpacity>

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={lightPurple}
            onPress={() => {
              console.log('Start Quiz');
              navigation.navigate('Quiz', { deck, deckId });
            }}
          >
            <FontAwesome name="comments" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Start Quiz
            </Text>
          </ButtonTouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;

  console.log('===> mapStateToProps :: deckId', deckId);
  console.log('===> mapStateToProps :: decks', decks);

  const deck = decks.items[deckId];

  console.log('===> mapStateToProps :: deck', deck);

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps, { onEditDeck })(DeckDetail);
