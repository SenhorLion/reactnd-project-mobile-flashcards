import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$grey100',
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    minHeight: 160,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '$grey50',
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 24,
    color: '$secondaryDark',
  },
  subText: {
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 20,
    color: '$secondaryLight',
  },
  messageText: {
    fontSize: 26,
    color: '$primary',
  },
});
