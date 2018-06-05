import React from 'react';
import {
  StyleSheet,
  Text,
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

export default class DeckDetail extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    const { navigation } = this.props;
    const { deck, entryId } = this.props.navigation.state.params;
    const numOfCards = deck.questions.length;
    return (
      <View style={styles.container}>
        <View>
          <Text>EntryId - {entryId}</Text>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{`${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20, width: 150 }]}
            onPress={() => {
              console.log('Add Card');
              navigation.navigate('AddCard', { deck, entryId });
            }}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20, width: 150 }]}
            onPress={() => console.log('Start Quiz')}
          >
            <FontAwesome name="comments" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Start Quiz
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
