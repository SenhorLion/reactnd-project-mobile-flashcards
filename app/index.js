import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

// Global app style variables

// TODO: Change colours here to match app
EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $primaryOrange: '#d57a66',
  $primaryGreen: '#00bd9d',
  $primaryPurple: '#9e768f',

  $purple: '#292477',
  $lightPurple: '#7c53c3',
  $white: '#FFFFFF',
  $antiFlashWhite: '#f2f3f4',
  $borderSeparator: '#e2e2e2',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',
  $gray: '#757575',
  $black: '#222222',

  // $outline: 1, // => use to see component layout!
});

import Main from './screens/Main';

export default () => <Main />;
