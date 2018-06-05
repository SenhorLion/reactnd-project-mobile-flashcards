import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import Header from '../components/ui/Header';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';

export default class AddCard extends React.Component {
  state = {
    isReady: false,
    question: '',
    answer: '',
  };

  handleAddCard = () => {
    const { question, answer } = this.state;

    // TODO: check for values
    console.log('@handleAddCard', question, answer);

    // TODO: add card to deck
  };

  render() {
    const { deck, entryId } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View>
          <Text>EntryId - {entryId}</Text>
          <Text style={styles.title}>{deck.title}</Text>

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Add Question"
            placeholderTextColor={black}
            onChangeText={question => this.setState(() => ({ question }))}
          />

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Add Answer"
            placeholderTextColor={black}
            onChangeText={answer => this.setState(() => ({ answer }))}
          />

          <TouchableOpacity
            style={[styles.button, { marginTop: 20, width: 150 }]}
            onPress={this.handleAddCard}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
});
