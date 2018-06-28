import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/ui/Header';
import DeckList from '../components/DeckList';
import * as actions from '../actions';
import { enforcePromiseDelay } from '../utils/helpers';
import { primary } from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

class Decks extends Component {
  static navigationOptions = {
    title: 'Back',
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
        <Header
          title="Flash Cards"
          backgroundColor={primary}
          marginBottom={6}
        />
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
