import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '$grey100',
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '$secondaryDark',
    paddingBottom: 5,
  },
  cardCount: {
    fontWeight: '500',
    fontSize: 22,
    color: '$secondaryLight',
  },
  textInput: {
    margin: 10,
    padding: 15,
    height: 50,
    backgroundColor: '$antiFlashWhite',
    borderRadius: 3,
    color: '$black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
