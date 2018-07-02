import React from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonTouchableOpacity, IconButton } from '../components/Buttons';
import { FontAwesome } from '@expo/vector-icons';
import {
  black,
  grey100,
  grey400,
  primary,
  secondaryDark,
  antiFlashWhite,
  redA700,
} from '../utils/colors';
import { onAddCard } from '../actions';
import AppModal from '../components/ui/AppModal';
import { InputText } from '../components/TextInput';
import { Container } from '../components/Container';

class AddCard extends React.Component {
  state = {
    question: null,
    answer: null,
    modalVisible: false,
    modalFormErrorVisible: false,
    questionError: false,
    answerError: false,
  };

  handleAddCard = () => {
    const { question, answer } = this.state;
    const { deck, deckId } = this.props.navigation.state.params;

    // Check we have question || answer values
    if (!question || !answer) {
      console.log('You must add both a question and a answer!');

      // TODO: Display a modal message to user
      // - must refactor modal to handle mulitple uses
      this.setState({
        modalFormErrorVisible: true,
        questionError: !question,
        answerError: !answer,
      });
      return;
    }

    const newCard = {
      id: cuid(),
      question,
      answer,
    };

    this.props.onAddCard(deckId, newCard).then(res => {
      // reset state
      this.setState({
        question: null,
        answer: null,
        modalFormErrorVisible: false,
        questionError: false,
        answerError: false,
      });

      // Notification on succesfully added card
      this.setModalVisible(true);
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

  closeModalFormError = () => {
    this.setState({
      modalFormErrorVisible: false,
    });
  };

  render() {
    const { question, answer, questionError, answerError } = this.state;

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
            error={questionError}
          />

          {/* error={questionError} */}
          <InputText
            placeholder="Add Answer"
            onChangeText={answer => this.setState(() => ({ answer }))}
            value={answer}
            error={answerError}
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

        <AppModal
          backdropColor={black}
          isVisible={this.state.modalFormErrorVisible}
          closeModal={this.closeModalFormError}
          closeModalTimer={2000}
          onBackdropPress={this.closeModalFormError}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.modalTitle, { color: redA700 }]}>
              Please enter a card value
            </Text>
            <IconButton
              visible={true}
              iconBackground={'transparent'}
              icon={<FontAwesome name="times" size={26} color={redA700} />}
              size={22}
              marginTop={0}
              onPress={() => this.closeModalFormError()}
            />
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
    color: secondaryDark,
    textAlign: 'center',
    paddingBottom: 5,
  },
  modalTitle: {
    fontWeight: '500',
    fontSize: 22,
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
