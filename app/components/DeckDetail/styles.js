import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '$purple',
  },
  cardCount: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '$gray',
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
    // paddingVertical: 10,
    paddingTop: 30,
  },
});
