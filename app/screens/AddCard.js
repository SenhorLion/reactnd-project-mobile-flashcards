import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonTouchableOpacity } from '../components/Buttons';
import { FontAwesome } from '@expo/vector-icons';
import { black, grey100, primary, antiFlashWhite } from '../utils/colors';
import { onAddCard } from '../actions';
import AppModal from '../components/ui/AppModal';
import { InputText } from '../components/TextInput';
import { Container } from '../components/Container';

class AddCard extends React.Component {
  state = {
    question: null,
    answer: null,
    modalVisible: false,
  };

  handleAddCard = () => {
    const { question, answer } = this.state;
    const { deck, deckId } = this.props.navigation.state.params;

    // Check we have question || answer values
    if (!question || !answer) {
      console.log('You must add both a question and a answer!');

      // TODO: Display a modal message to user
      // - must refactor modal to handle mulitple uses
      return;
    }

    const newCard = {
      id: cuid(),
      question,
      answer,
    };

    this.setState({
      question: null,
      answer: null,
    });

    this.props.onAddCard(deckId, newCard).then(res => {
      // Notification on succesfully added card
      this.setModalVisible(true);
      // Allow user to add more cards...
    });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  toggleModalVisible = () => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <Container>
        <View
          style={[
            styles.container,
            {
              marginTop: 20,
            },
          ]}
        >
          <Text style={styles.title}>Add a new card</Text>

          <InputText
            placeholder="Add Question"
            onChangeText={question => this.setState(() => ({ question }))}
            value={question}
          />

          <InputText
            placeholder="Add Answer"
            onChangeText={answer => this.setState(() => ({ answer }))}
            value={answer}
          />

          <ButtonTouchableOpacity
            marginTop={20}
            width={150}
            backgroundColor={primary}
            onPress={this.handleAddCard}
          >
            <FontAwesome name="plus" size={20} color={antiFlashWhite} />
            <Text style={{ fontSize: 18, color: antiFlashWhite }}>
              Add Card
            </Text>
          </ButtonTouchableOpacity>
        </View>

        <AppModal
          backdropColor={black}
          isVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          closeModalTimer={1250}
          onBackdropPress={this.toggleModalVisible}
        >
          <View>
            <Text style={styles.modalTitle}>New card added!</Text>
          </View>
        </AppModal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: grey100,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
    color: primary,
    textAlign: 'center',
    paddingBottom: 5,
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: 24,
    color: primary,
    textAlign: 'center',
    paddingBottom: 5,
  },
});

const mapStateToProps = ({ decks }, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks.items[deckId];

  return {
    deckId,
    deck,
  };
};

export default connect(mapStateToProps, { onAddCard })(AddCard);
