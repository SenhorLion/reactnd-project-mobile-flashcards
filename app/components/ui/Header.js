import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({
  backgroundColor,
  title = 'Mobile Flash Cards',
  ...props
}) => (
  <View style={[styles.header, { backgroundColor, ...props }]}>
    <Text style={{ color: '#fff', fontSize: 24 }}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    height: 60,
    // width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
