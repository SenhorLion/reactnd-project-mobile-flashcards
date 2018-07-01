import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { black, secondaryLight, secondaryDark } from '../utils/colors';
import { Card } from '../components/Cards';
import AppModal from '../components/ui/AppModal';
import { onDeleteCard, onEditCard } from '../actions';
import { DeleteModalConfirm } from '../components/Modals';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 26,
    color: secondaryDark,
    marginTop: 20,
  },
  cardCount: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 22,
    color: secondaryLight,
    marginBottom: 10,
  },
});

class EditCard extends Component {
  state = {
    modalVisible: false,
    cardSelected: null,
  };

  handleSaveCard = card => {
    const { deckId, onEditCard } = this.props;

    onEditCard(deckId, card);
  };

  handleDeleteCard = card => {
    this.setState({ cardSelected: card }, () => {
      this.toggleModalVisible();
    });
  };

  confirmDeleteCard = () => {
    const { cardSelected } = this.state;
    const { deckId } = this.props.navigation.state.params;

    this.props
      .onDeleteCard(deckId, cardSelected.id)
      .then(res => {
        this.toggleModalVisible();
        this.clearSelectedDeck();
      })
      .catch(err => console.log('Error: ', err));
  };

  clearSelectedDeck = () => {
    this.setState(prevState => ({
      cardSelected: null,
    }));
  };

  toggleModalVisible = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  componentDidUpdate() {
    const { deckId, deck, navigation } = this.props;

    if (!deck.questions.length) {
      navigation.navigate('DeckDetail', {
        deckId,
        deck,
      });
    }
  }

  render() {
    const { deck } = this.props;
    const numOfCards = deck.questions.length;

    return (
      <View style={styles.container}>
        <View styles={{ flex: 1, padding: 10 }}>
          <Text style={styles.title}>Cards for {deck.title}</Text>
          <Text style={styles.cardCount}>{`${numOfCards} ${
            numOfCards > 1 ? 'cards' : 'card'
          }`}</Text>
        </View>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
          >
            {deck.questions && (
              <FlatList
                data={deck.questions}
                renderItem={({ item, index }) => (
                  <Card
                    index={Number(index) + 1}
                    key={cuid()}
                    card={item}
                    handleDeleteCard={this.handleDeleteCard}
                    handleSaveCard={this.handleSaveCard}
                  />
                )}
                keyExtractor={item => cuid()}
              />
            )}
          </KeyboardAwareScrollView>
        </View>

        <AppModal
          backdropColor={black}
          isVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          onBackdropPress={this.toggleModalVisible}
        >
          <DeleteModalConfirm
            title="Delete Card"
            confirmDelete={this.confirmDeleteCard}
            confirmCancel={this.toggleModalVisible}
          />
        </AppModal>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks.items[deckId];

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps, { onDeleteCard, onEditCard })(EditCard);
