import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { Constants } from 'expo';

const AppStatusBar = ({ backgroundColor, ...props }) => {
  const containerStyles = [{ backgroundColor }];

  // NB: In Android, `Constants.statusBarHeight` causes a gap at the top of between the header and StatusBar
  // to get around this, we only use `statusBarHeight` for `ios`
  if (Platform.OS === 'ios') {
    containerStyles.push({
      height: Constants.statusBarHeight,
    });
  }
  return (
    <View style={containerStyles}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default AppStatusBar;
