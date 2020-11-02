import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: color.white,
    padding: 30,
    paddingBottom: 20,
  },
  txtHeader: {
    color: color.primary,
    fontFamily: 'SFPro-Bold',
    fontSize: 36,
    marginBottom: 30,
    marginLeft: -10,
  },
  txtSubHeader: {
    color: color.black,
    fontSize: 32,
    fontFamily: 'SFPro-Light',
    marginBottom: 30,
  },
  txtPhone: {
    color: color.black,
    fontSize: 18,
    fontFamily: 'SFPro-Regular',
  },
  otpContainer: {
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  otp: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: color.grey,
    color: color.primary,
    fontSize: 18,
    borderRadius: 10,
  },
  txtResend: {
    color: color.primary,
    fontFamily: 'SFPro-Bold',
    fontSize: 16,
  },
});
