import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: color.white,
    padding: 30,
    paddingBottom: 0,
  },
  top: {
    color: color.black,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'SFPro-SemiBold',
  },
  box: {
    width: width / 4,
    height: width / 4,
    backgroundColor: color.white,
    borderRadius: width / 4 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.green,
    borderWidth: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: width / 10,
  },
  txtInfo: {
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    color: color.green,
    marginBottom: width / 10,
  },
  txtDate: {
    fontSize: 14,
    fontFamily: 'SFPro-Light',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: color.black,
  },
  boxWallet: {
    borderColor: color.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  txtCash: {
    fontSize: 18,
    fontFamily: 'SFPro-Bold',
    color: color.black,
  },
  txtSaldo: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'SFPro-Regular',
  },
  saldo: {
    //marginTop: 20,
    fontFamily: 'SFPro-SemiBold',
    color: color.black,
    fontSize: 16,
    //marginBottom: 10,
  },

  button: {
    backgroundColor: color.primary,
    height: 40,
    borderRadius: 40,
    width: width - 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    marginTop: 25,
  },
  btnText: {
    color: color.white,
    fontSize: 18,
    fontFamily: 'SFPro-Light',
  },
});
