import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

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

export default ButtonTouchableOpacity;
