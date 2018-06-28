import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const IconButton = ({
  visible,
  iconBackground,
  onPress = () => {},
  size,
  marginTop = 0,
  icon = null,
  iconText = null,
}) => {
  const BORDER_RADIUS = 22;
  const iconStyles = [styles.iconButton];
  const borderRadiusSize = size ? size / 2 : BORDER_RADIUS;

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
