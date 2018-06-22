import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Main from './screens/Main';

// Global app style variables

// TODO: Change colours here to match app
EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $primaryOrange: '#d57a66',
  $primaryGreen: '#00bd9d',
  $primaryPurple: '#9e768f',

  $antiFlashWhite: '#f2f3f4',
  $amber: '#FFC107',
  $borderSeparator: '#e2e2e2',
  $black: '#222222',
  $blue: '#4e4cb8',
  $cyan: '#00BCD4',
  $darkText: '#343434',
  $indigo: '#3F51B5',
  $inputText: '#797979',
  $gray: '#757575',
  $green: '#bada55',
  $grey400: '#BDBDBD',
  $lightGreen: '#8BC34A',
  $lightGray: '#e2e2e2',
  $lightPurple: '#7c53c3',
  $orange: '#f26f28',
  $purple: '#292477',
  $red: '#b71845',
  $pink: '#b93fb3',
  $white: '#fff',

  // $outline: 1, // => use to see component layout!
});

export default () => <Main />;
