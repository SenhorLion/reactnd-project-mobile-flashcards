import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const InputText = props => {
  const {
    onChangeText,
    label,
    value,
    placeholder = '',
    clearButtonMode = 'always',
    editable = true,
    error = false,
  } = props;

  const containerStyles = [styles.container];
  const inputStyles = [styles.input];

  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }
  if (error) {
    inputStyles.push(styles.errorStyle);
  }

  return (
    <View style={containerStyles}>
      <TextInput
        style={inputStyles}
        underlineColorAndroid="transparent"
        clearButtonMode={clearButtonMode}
        {...props}
      />
    </View>
  );
};

TextInput.propTypes = {
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.element,
  value: PropTypes.string,
  editable: PropTypes.bool,
};

export default InputText;
