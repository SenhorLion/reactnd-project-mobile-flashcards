import React from 'react';
import { View, Text } from 'react-native';
import { primary, grey400 } from '../../utils/colors';
import { ButtonTouchableOpacity } from '../Buttons';
import styles from './styles';

const DeleteModalConfirm = ({ confirmDelete, confirmCancel, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <ButtonTouchableOpacity
          width={150}
          backgroundColor={primary}
          onPress={confirmDelete}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </ButtonTouchableOpacity>

        <ButtonTouchableOpacity
          width={150}
          backgroundColor={grey400}
          onPress={confirmCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </ButtonTouchableOpacity>
      </View>
    </View>
  );
};

export default DeleteModalConfirm;
