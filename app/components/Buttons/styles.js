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
    backgroundColor: '$primary',
  },
  button: {
    flexDirection: 'row',
    padding: 4,
    margin: 4,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '$primary',
    borderWidth: 1,
    borderColor: '$primaryText',
  },
});
