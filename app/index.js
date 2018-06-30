import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Main from './screens/Main';

// Global app style variables
EStyleSheet.build({
  // MAIN THEME COLORS:
  // ===
  // palette from Material UI
  $primary: '#00838f', // base: cyan-9
  $primaryLight: '#4fb3bf',
  $primaryDark: '#005662',
  $primaryText: '#ffffff',

  $secondary: '#445963',
  $secondaryLight: '#708690',
  $secondaryDark: '#1b3039',
  $secondaryText: '#ffffff',

  $highlight: '#ffd600',
  $highlightLight: '#ffff52',
  $highlightDark: '#c7a500',

  $antiFlashWhite: '#f2f3f4',
  $black: '#222222',

  $inputText: '#797979',

  $grey50: '#FAFAFA',
  $grey100: '#F5F5F5',
  $grey400: '#BDBDBD',
  $redA700: '#D50000',
  $white: '#ffffff',

  // $outline: 1, // => use to see component layout!
});

export default () => <Main />;
