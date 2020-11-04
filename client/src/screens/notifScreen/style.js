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
    width: width - 40,
    height: width / 3,
    backgroundColor: color.primary,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    flexDirection: 'row',
  },
  saldo: {
    fontSize: 34,
    fontFamily: 'SFPro-Bold',
    color: color.white,
    //marginBottom: 10,
  },
  balance: {
    fontSize: 16,
    color: color.white,
    fontFamily: 'SFPro-Regular',
  },
  txtRecent: {
    //marginTop: 50,
    fontFamily: 'SFPro-SemiBold',
    color: color.black,
    fontSize: 16,
    //marginBottom: 10,
  },
  boxRecent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //arginTop: 30,
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
    backgroundColor: color.white,
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
  btnTextRight: {
    color: color.primary,
    fontSize: 20,
    fontFamily: 'SFPro-Bold',
  },
  boxBtn: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
