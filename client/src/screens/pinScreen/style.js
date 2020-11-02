import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: color.primary,
  },
  dockerBottom: {
    backgroundColor: color.white,
    justifyContent: 'flex-start',
    padding: 30,
    paddingBottom: 20,
    height: (3 / 5) * height,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
    marginBottom: 20,
  },
  txtPhone: {
    color: color.black,
    fontSize: 18,
    fontFamily: 'SFPro-Regular',
  },
  otpContainer: {
    width: '100%',
    height: 50,
    marginTop: 10,
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
  iconFingerprint: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 70,
    textAlign: 'center',
  },
  txtFingerprint: {
    display: 'flex',
    color: color.primary,
    alignItems: 'center',
    fontFamily: 'SFPro-Regular',
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  wrapperProfile: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25,
  },
  txtProfile: {
    color: color.white,
    fontFamily: 'SFPro-Bold',
    fontSize: 24,
  },
});
