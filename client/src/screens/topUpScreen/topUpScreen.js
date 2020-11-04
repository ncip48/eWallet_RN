import React, {useState, useContext} from 'react';
import {View, StatusBar, Text, Image, TouchableOpacity} from 'react-native';
import {Icon, Header, Input} from 'react-native-elements';
import {CardDetailTransaction, Button} from '../../components';
import {Snackbar, Chip} from 'react-native-paper';
import {useMutation} from 'react-query';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
//import {formatRupiah} from '../../utils/formatRupiah';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API} from '../../config/api';

function currencyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const topUpScreen = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [topUpGopay, {isLoading, error}] = useMutation(async (values) => {
    // console.log(
    //   JSON.stringify({ammount: parseInt(values.ammount), to: values.phone}),
    // );
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      ammount: parseInt(values.ammount),
    });
    const res = await API.post('/topup-gopay', body, config);
    //console.log(res.data.data);
    navigation.navigate('detail_top_up', {
      //   data: {
      //     transaction_id: '86888ca6-f15f-4989-a493-4be9d6ddf1f8',
      //     order_id: 'gopay-081335241314-1604483213914',
      //     merchant_id: 'G500506167',
      //     ammount: '50000.00',
      //     date: '2020-11-04 16:46:54',
      //     status: 'pending',
      //     qr:
      //       'https://api.sandbox.veritrans.co.id/v2/gopay/86888ca6-f15f-4989-a493-4be9d6ddf1f8/qr-code',
      //     deeplink:
      //       'https://simulator.sandbox.midtrans.com/gopay/ui/checkout?referenceid=BZgfaPKv07&callback_url=someapps%3A%2F%2Fcallback%3Forder_id%3Dgopay-081335241314-1604483213914',
      //   },
      data: res.data.data,
    });
    //} catch (err) {
    //onToggleSnackBar();
    //}
  });

  return (
    <>
      <StatusBar
        backgroundColor={color.white}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        centerComponent={{
          text: 'Top-Up e-wallet',
          style: {
            color: color.black,
            fontSize: 20,
            fontFamily: 'SFPro-Regular',
          },
        }}
        leftComponent={
          <Icon
            type="antdesign"
            name="close"
            size={25}
            onPress={() => navigation.goBack()}
          />
        }
        leftContainerStyle={{left: 10}}
        containerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{ammount: '0'}}
          onSubmit={(values) => topUpGopay(values)}>
          {({values, handleChange, handleSubmit, setFieldValue}) => (
            <>
              <Input
                label="Ammount Top-Up"
                placeholder="0"
                name="ammount"
                keyboardType="numeric"
                value={values.ammount}
                onChangeText={handleChange('ammount')}
                errorStyle={{color: 'red', fontSize: 14}}
              />
              <View style={styles.row}>
                <Chip onPress={() => setFieldValue('ammount', '50000')}>
                  50.000
                </Chip>
                <Chip onPress={() => setFieldValue('ammount', '100000')}>
                  100.000
                </Chip>
                <Chip onPress={() => setFieldValue('ammount', '200000')}>
                  200.000
                </Chip>
                <Chip onPress={() => setFieldValue('ammount', '500000')}>
                  500.000
                </Chip>
                <Chip onPress={() => setFieldValue('ammount', '1000000')}>
                  1.000.000
                </Chip>
              </View>
              <View style={styles.boxWallet}>
                <Text style={styles.txtCash}>pay with</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Image
                    source={require('../../asset/img/gopay.png')}
                    style={{height: 50, width: 150}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      <Snackbar
        visible={error}
        onDismiss={onDismissSnackBar}
        duration={2000}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {error ? error.response.data.error.message : null}
      </Snackbar>
    </>
  );
};
