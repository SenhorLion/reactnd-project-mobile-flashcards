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

  // existing styling...
  // TODO: Clean these up ie. delete most and use above theme
  $antiFlashWhite: '#f2f3f4',
  $borderSeparator: '#e2e2e2',
  $black: '#222222',
  $cyan: '#00BCD4',
  $indigo: '#3F51B5',
  $inputText: '#797979',
  $green: '#bada55',
  $green200: '#A5D6A7',
  $green300: '#81C784',
  $green500: '#4CAF50',
  $grey50: '#FAFAFA',
  $grey100: '#F5F5F5',
  $grey400: '#BDBDBD',
  $redA700: '#D50000',
  $white: '#ffffff',

  // $outline: 1, // => use to see component layout!
});

export default () => <Main />;
