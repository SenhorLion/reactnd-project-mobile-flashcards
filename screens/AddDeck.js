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
import Footer from '../components/ui/Footer';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';

// TODO: Make into a module
const AddDeckButton = ({ onPress }) => (
  <TouchableOpacity
    style={[
      styles.iosSubmitBtn,
      { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },
    ]}
  >
    <FontAwesome name="plus" size={30} color={purple} />
    <Text style={[styles.submitBtnText, { padding: 10 }]}>Add Deck</Text>
  </TouchableOpacity>
);

export default class AddDeck extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Add Deck" backgroundColor={purple} marginBottom={6} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Add Deck Screen</Text>
          <AddDeckButton />
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
  iosSubmitBtn: {
    // backgroundColor: purple,
    padding: 4,
    borderRadius: 2,
    height: 35,
    margin: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: antiFlashWhite,
    borderColor: purple,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
  },
  submitBtnText: {
    color: purple,
    fontSize: 22,
    textAlign: 'center',
  },
});
