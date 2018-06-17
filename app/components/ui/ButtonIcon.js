import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ButtonIcon = props => {
  const { marginTop, color = '#000000', width, onPress, icon = 'plus' } = props;
  return (
    <TouchableOpacity
      style={[styles.button, { marginTop, width }]}
      onPress={onPress}
    >
      <FontAwesome name={icon} size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 4,
    margin: 4,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default ButtonIcon;
