import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const IconButton = ({
  visible,
  iconBackground,
  onPress = () => {},
  size = 22,
  marginTop = 0,
  icon = null,
  iconText = null,
}) => {
  const iconStyles = [styles.iconButton];
  const borderRadiusSize = size / 2;

  if (visible) {
    iconStyles.push(styles.iconVisible);
  }

  if (size) {
    iconStyles.push({
      width: size,
      height: size,
      borderRadius: borderRadiusSize,
    });
  }

  if (marginTop) {
    iconStyles.push({
      marginTop,
    });
  }

  if (iconBackground) {
    iconStyles.push({ backgroundColor: iconBackground });
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={iconStyles}>{icon}</View>
      {iconText && (
        <View>
          <Text style={styles.iconText}>{iconText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
