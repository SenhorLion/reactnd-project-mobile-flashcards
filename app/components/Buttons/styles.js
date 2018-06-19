import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  iconText: {
    fontWeight: '300',
    fontSize: 14,
    paddingVertical: 5,
  },
  iconVisible: {
    backgroundColor: '$primaryBlue',
  },
});
