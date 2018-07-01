import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { onAddDeck } from '../actions';
import { InputText } from '../components/TextInput';

import { FontAwesome } from '@expo/vector-icons';
import { primary, secondaryDark, antiFlashWhite } from '../utils/colors';
import { Container } from '../components/Container';
import { ButtonTouchableOpacity } from '../components/Buttons';

class AddDeck extends React.Component {
  state = {
    deckTitle: '',
  };

  handleAddDeck = () => {
    const { deckTitle } = this.state;

    // check there is input values
    if (!deckTitle) {
      // TODO: return  error notification
      console.warn('You must submit a title for the deck');

      return;
    }

    const newDeck = {
      id: cuid(),
      timestamp: Date.now(),
      title: deckTitle,
      questions: [],
    };

    this.props.onAddDeck(newDeck).then(res => {
      const { id } = res.deck;

      // Clear deckTitle from state
      this.setState(() => ({
        deckTitle: '',
      }));

      // Navigate to Deck Detail, from where you can add cards
      this.props.navigation.navigate('DeckDetail', {
        deckId: id,
        deck: res.deck,
      });
    });
  };

  render() {
    const { deckTitle } = this.state;

    return (
      <Container>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <Text style={styles.title}>Enter a title for this Deck:</Text>

            <InputText
              placeholder="Deck Title"
              onChangeText={deckTitle => this.setState(() => ({ deckTitle }))}
              value={deckTitle}
            />
            <ButtonTouchableOpacity
              backgroundColor={primary}
              marginTop={10}
              width={150}
              onPress={() => this.handleAddDeck()}
            >
              <FontAwesome name="plus" size={20} color={antiFlashWhite} />
              <Text style={{ fontSize: 18, color: antiFlashWhite }}>
                Add Deck
              </Text>
            </ButtonTouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: 24,
    color: secondaryDark,
    textAlign: 'center',
    alignItems: 'center',
  },
});

export default connect(null, { onAddDeck })(AddDeck);
