import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //width: Dimensions.get('window').width,
    // height:
    //   Dimensions.get('window').height -
    //   (50 / 100) * Dimensions.get('window').width,
    //resizeMode: 'stretch',
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: color.primary,
    //padding: 30,
  },
  dockerBottom: {
    backgroundColor: color.white,
    justifyContent: 'flex-end',
    padding: 30,
    paddingBottom: 20,
    height: 380,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  button: {
    backgroundColor: color.primary,
    height: 50,
    borderRadius: 50,
    width: width - 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  btnText: {
    color: color.white,
    fontSize: 20,
    fontFamily: 'SFPro-Regular',
  },
  txtHeader: {
    color: color.white,
    fontFamily: 'SFPro-Bold',
    marginLeft: 30,
    marginBottom: 15,
    fontSize: 36,
    zIndex: 9999,
    elevation: 9999,
  },
  txtSubHeader: {
    color: color.black,
    fontSize: 32,
    fontFamily: 'SFPro-Light',
    bottom: 70,
  },
  txtPhone: {
    color: color.black,
    fontSize: 18,
    fontFamily: 'SFPro-Regular',
    bottom: 50,
  },
  txtPhoneNumber: {
    color: color.black,
    fontSize: 38,
    fontFamily: 'SFPro-Bold',
    bottom: 50,
  },
  txtInputPhone: {
    color: color.black,
    fontSize: 38,
    fontFamily: 'SFPro-Bold',
    bottom: 60,
    width: '100%',
    left: 10,
  },
  txtAccount: {
    color: '#24224D',
    fontFamily: 'SFPro-Regular',
    textAlign: 'center',
    bottom: 0,
    fontSize: 16,
  },
  txtBottom: {
    fontWeight: 'bold',
    color: color.primary,
  },
});
