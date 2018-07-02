import { StyleSheet, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const containerWidth = Dimensions.get('window').width - 40;

export default EStyleSheet.create({
  topContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '90%',
    height: 70,
    marginTop: 10,
    marginBottom: 10,
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
    height: 300,
    width: '90%',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$grey100',
    backfaceVisibility: 'hidden',
    width: containerWidth,
    borderRadius: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '$grey50',
    padding: 5,
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
    color: '$secondaryDark',
    paddingBottom: 5,
  },
  subTitle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 22,
    color: '$secondaryLight',
  },
  questionText: {
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
    color: '$primary',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  answerText: {
    color: '$primary',
  },
  cardLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 5,
    backgroundColor: '$secondaryLight',
    color: '$primaryText',
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
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 32,
    color: '$primary',
    paddingBottom: 16,
  },
  statsText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
    color: '$primaryLight',
    paddingBottom: 8,
  },
  statsTextHeavy: {
    fontWeight: '600',
    fontSize: 22,
  },
});
