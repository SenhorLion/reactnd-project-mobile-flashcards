import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$antiFlashWhite',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 4,
    minHeight: 100,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: '$secondaryDark',
  },
  subText: {
    textAlign: 'center',
    fontSize: 20,
    color: '$grey400',
  },
  iconButtonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  cardContent: {
    paddingBottom: 4,
  },
  editCardContainer: {
    backgroundColor: '$grey100',
    padding: 20,
    borderWidth: 1,
    borderColor: '$primaryLight',
    borderRadius: 4,
  },
  editLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '$primary',
  },
});
