import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '$purple',
  },
  cardCount: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '$grey400',
  },
  quizHeader: {
    paddingVertical: 20,
  },
  quizBody: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  quizView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  quizFooter: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
