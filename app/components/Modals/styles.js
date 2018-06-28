import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '$primaryText',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '$primary',
    paddingBottom: 10,
  },
});
