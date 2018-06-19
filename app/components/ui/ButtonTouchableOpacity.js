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

const ButtonTouchableOpacity = props => {
  const {
    marginTop,
    width,
    backgroundColor = '#fff',
    onPress,
    children,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, marginTop, width }]}
      onPress={onPress}
    >
      {children}
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
export default ButtonTouchableOpacity;
