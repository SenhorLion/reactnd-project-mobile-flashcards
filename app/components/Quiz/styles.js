import { StyleSheet, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const containerWidth = Dimensions.get('window').width - 40;

export default EStyleSheet.create({
  topContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '90%',
    height: 60,
    marginTop: 20,
    marginBottom: 16,
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 20,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '$lightPurple',
    height: 300,
    width: '90%',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$grey100', //'$primaryLight', //'$grey100',
    backfaceVisibility: 'hidden',
    width: containerWidth,
    // height: 300,
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '$grey50',
    padding: 5,
    // backgroundShadow:
  },
  cardBack: {
    position: 'absolute',
    backgroundColor: '$grey100',
    height: '100%',
    width: '100%',
    top: 0,
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$white',
    height: '100%',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
    color: '$primary',
    paddingBottom: 5,
  },
  subTitle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 22,
    color: '$primary',
  },
  questionText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    color: '$primary',
    paddingBottom: 4,
  },
  answerText: {
    color: '$primary',
  },
  statsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$grey100',
    backfaceVisibility: 'hidden',
    width: containerWidth,
    height: 300,
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '$grey50',
    paddingHorizontal: 10,
  },
  completeMessage: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 28,
    color: '$primary',
    paddingBottom: 16,
  },
  statsText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
    color: '$primary',
    paddingBottom: 8,
  },
  statsTextHeavy: {
    fontWeight: '600',
    fontSize: 22,
  },
});
