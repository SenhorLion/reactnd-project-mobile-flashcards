import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

// Global app style variables

// TODO: Change colours here to match app
EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $primaryOrange: '#d57a66',
  $primaryGreen: '#00bd9d',
  $primaryPurple: '#9e768f',

  $white: '#FFFFFF',
  $borderSeparator: '#e2e2e2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',

  // $outline: 1, // => use to see component layout!
});

import Main from './screens/Main';

export default () => <Main />;
