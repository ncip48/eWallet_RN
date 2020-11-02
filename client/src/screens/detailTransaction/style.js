import {StyleSheet, Dimensions} from 'react-native';
import color from '../../utils/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: color.white,
    padding: 20,
    paddingTop: 0,
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
  ammount: {
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: color.black,
  },
  balance: {
    fontSize: 16,
    color: color.white,
    fontFamily: 'SFPro-Regular',
  },
  txtDetail: {
    marginTop: 20,
    fontFamily: 'SFPro-SemiBold',
    color: color.black,
    fontSize: 16,
    //marginBottom: 10,
  },
  boxRecent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  buttonLeft: {
    backgroundColor: color.primary,
    height: 60,
    borderRadius: 12,
    width: width / 2 - 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  buttonRight: {
    backgroundColor: color.secondary,
    height: 60,
    borderRadius: 12,
    width: width / 2 - 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  btnText: {
    color: color.white,
    fontSize: 20,
    fontFamily: 'SFPro-Bold',
  },
  boxBtn: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
