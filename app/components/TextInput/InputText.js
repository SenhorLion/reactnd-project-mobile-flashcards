import React from 'react';
import { View, TextInput } from 'react-native';
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
  } = props;

  const containerStyles = [styles.container];

  if (editable === false) {
    containerStyles.push(styles.containerDisabled);
  }

  return (
    <View style={containerStyles}>
      <TextInput
        style={styles.input}
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
