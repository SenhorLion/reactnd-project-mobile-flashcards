import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import { onAddDeck } from '../actions';
import { InputText } from '../components/TextInput';

import { FontAwesome } from '@expo/vector-icons';
import { black, purple, antiFlashWhite } from '../utils/colors';
import { Container } from '../components/Container';

// TODO: Make Button into a module component
const AddDeckButton = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.button, { marginTop: 20, width: 150 }]}
    onPress={onPress}
  >
    <FontAwesome name="plus" size={20} color={antiFlashWhite} />
    <Text style={{ fontSize: 18, color: antiFlashWhite }}>Add Deck</Text>
  </TouchableOpacity>
);

class AddDeck extends React.Component {
  state = {
    isReady: false,
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

    // TODO: Setup Local notification message to remind to study
    // clearLocalNotifications().then(setLocalNotification);
  };

  render() {
    const { deckTitle } = this.state;

    return (
      <Container>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={styles.title}>Enter a title for this Deck:</Text>

            <InputText
              placeholder="Deck Title"
              onChangeText={deckTitle => this.setState(() => ({ deckTitle }))}
              value={deckTitle}
            />
            <AddDeckButton onPress={this.handleAddDeck} />
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    margin: 10,
    padding: 15,
    height: 50,
    width: 280,
    backgroundColor: antiFlashWhite,
    borderRadius: 3,
    color: black,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: purple,
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    padding: 4,
    margin: 4,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  submitBtnText: {
    color: purple,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default connect(null, { onAddDeck })(AddDeck);
