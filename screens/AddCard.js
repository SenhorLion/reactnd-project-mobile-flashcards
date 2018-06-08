import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  Modal,
  View,
  Platform,
} from 'react-native';
import { Constants, AppLoading } from 'expo';
import Header from '../components/ui/Header';
import ButtonTouchableOpacity from '../components/ui/ButtonTouchableOpacity';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';
import { onAddCard } from '../actions/deck-actions';

class AddCard extends React.Component {
  state = {
    isReady: false,
    question: '',
    answer: '',
    modalVisible: false,
  };

  handleAddCard = () => {
    const { question, answer } = this.state;
    const { deck, entryId } = this.props.navigation.state.params;

    console.log('@handleAddCard');
    console.log('DECK_INFO', entryId, question, answer);

    // TODO: check for values

    const newCard = {
      question,
      answer,
    };

    // TODO: Clear form - this aint woikin gright now??!
    this.setState({
      question: '',
      answer: '',
    });

    this.props.dispatch(onAddCard(entryId, newCard));

    // ToastAndroid.show('New Card Added, Add another one?', ToastAndroid.SHORT);

    this.setModalVisible(true);

    // Notification on succesfully added card
    console.log('Added Card, Add another one?');

    // Allow user to add more cards
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { deck, entryId } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Add Question"
            placeholderTextColor={black}
            onChangeText={question => this.setState(() => ({ question }))}
            value={question}
          />

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Add Answer"
            placeholderTextColor={black}
            onChangeText={answer => this.setState(() => ({ answer }))}
            value={answer}
          />

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            onPress={this.handleAddCard}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </ButtonTouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 80 }}>
            <View>
              <Text>New card added!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Close Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
});

export default connect()(AddCard);
