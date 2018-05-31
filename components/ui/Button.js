import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import {
  black,
  purple,
  lightPurple,
  white,
  antiFlashWhite,
} from '../../utils/colors';

const Button = props => {
  const { marginTop, text, width, onPress } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { marginTop, width }]}
      onPress={onPress}
    >
      <FontAwesome name="plus" size={20} color={antiFlashWhite} />
      <Text style={{ fontSize: 18, color: antiFlashWhite }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
export default Button;
