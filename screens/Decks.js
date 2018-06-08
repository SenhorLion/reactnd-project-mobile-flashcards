import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Constants, AppLoading } from 'expo';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import DeckList from '../components/DeckList';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as actions from '../actions';
import { enforcePromiseDelay } from '../utils/helpers';
import {
  black,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../utils/colors';

{
  /* <Header
title="Flash Cards"
backgroundColor={purple}
flex={1}
marginBottom={6}
/> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  iosSubmitBtn: {
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

class Decks extends React.Component {
  static navigationOptions = {
    // headerTitle instead of title
    title: 'Flash Cards',
  };
  state = {
    isReady: false,
    isDecksLoaded: false,
  };

  componentDidMount() {
    const { fetchAllDecks } = this.props;

    // TODO: Remove enforcePromiseDelay for production
    enforcePromiseDelay(1000).then(() => {
      fetchAllDecks().then(decks => {
        this.setState(() => ({
          isDecksLoaded: true,
        }));
      });
    });
  }

  render() {
    const { isDecksLoaded } = this.state;
    const { decks } = this.props;

    // TODO: Only pass props needed, instead of {...props}
    return (
      <View style={styles.container}>
        <Header title="Flash Cards" backgroundColor={purple} marginBottom={6} />
        <DeckList decks={decks} isDecksLoaded={isDecksLoaded} {...this.props} />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps, actions)(Decks);
