import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ButtonTouchableOpacity from './ButtonTouchableOpacity';
import {
  black,
  gray,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

class AppModal extends Component {
  timerID = null;

  componentDidUpdate(prevProps) {
    if (this.props.isVisible !== prevProps.isVisible) {
      const { closeModal, closeModalTimer } = this.props;
      //  Start clear timer
      // clear any existing timer first
      clearTimeout(this.timerID);
      this.timerID = setTimeout(() => closeModal(), closeModalTimer);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    const {
      isVisible,
      backdropColor = { lightPurple },
      closeModal,
      onBackdropPress,
      children,
    } = this.props;

    return (
      <Modal
        backdropColor={backdropColor}
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
      >
        <View style={styles.modalContent}>{children}</View>
      </Modal>
    );
  }
}

AppModal.defaultProps = { closeModalTimer: 3000 };

export default AppModal;
