import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { black, white } from '../../utils/colors';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: white,
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

      if (closeModalTimer) {
        // Clear any existing timer first
        // then Start clear timer
        clearTimeout(this.timerID);
        this.timerID = setTimeout(() => closeModal(), closeModalTimer);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    const {
      isVisible,
      backdropColor = { black },
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

// Set defaultProps
// - closeModalTimer: 0 - so a specific modal must set this to activate timer to close modal
AppModal.defaultProps = { closeModalTimer: 0 };

export default AppModal;
