import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Footer = ({ backgroundColor, title = 'Footer', ...props }) => (
  <View style={[styles.header, { backgroundColor, ...props }]}>
    <Text>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
  },
});

export default Footer;
