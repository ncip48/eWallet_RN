import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.primary,
    padding: 30,
    paddingBottom: 20,
  },
  txtHeader: {
    color: color.white,
    fontSize: 58,
    fontFamily: 'SFPro-Bold',
    width: 220,
    bottom: 90,
    zIndex: 99,
    elevation: 99,
  },
  subHeader: {
    color: color.white,
    fontSize: 16,
    fontFamily: 'SFPro-Regular',
    width: 260,
    bottom: 70,
  },
  button: {
    backgroundColor: color.white,
    height: 50,
    borderRadius: 50,
    width: width - 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  txtButton: {
    color: color.primary,
    fontSize: 20,
    fontFamily: 'SFPro-Regular',
  },
  txtAccount: {
    color: '#9CA1D2',
    fontFamily: 'SFPro-Regular',
    textAlign: 'center',
    bottom: 0,
    fontSize: 16,
  },
  txtBottom: {
    fontWeight: 'bold',
    color: color.white,
  },
});
