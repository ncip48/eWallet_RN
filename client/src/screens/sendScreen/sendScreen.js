import React, {useState, useContext} from 'react';
import {View, StatusBar, Text} from 'react-native';
import {Icon, Header, Input} from 'react-native-elements';
import {CardDetailTransaction, Button} from '../../components';
import {Snackbar} from 'react-native-paper';
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

export const sendScreen = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [transaction, {isLoading, error}] = useMutation(async (values) => {
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
      to: values.phone,
    });
    const res = await API.post('/transaction', body, config);
    // console.log(res.data.data);
    // navigation.navigate('detail_send', {
    //   data: {
    //     ammount: 10000,
    //     txid: 'TRX-462816',
    //     first_name: 'lucu',
    //     last_name: 'lu ya',
    //     date: '2020-11-02',
    //     time: '18:00:01',
    //     sender: {
    //       id: 1,
    //       uid: '081335241314',
    //       photo: '1603783033637-bg1.png',
    //       first_name: 'Herly',
    //       last_name: 'Chahya',
    //     },
    //     receiver: {
    //       id: 3,
    //       uid: '089615182622',
    //       photo: '1603783033637-bg1.png',
    //       first_name: 'Ncip',
    //       last_name: 'Ganteng',
    //     },
    //   },
    // });
    navigation.navigate('detail_send', {data: res.data.data});
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
          text: 'Send Money',
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
          initialValues={{phone: '', ammount: '0'}}
          onSubmit={(values) => transaction(values)}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <Input
                label="Enter phone number"
                placeholder="+62"
                keyboardType="numeric"
                //leftIcon={{ type: 'font-awesome', name: 'comment' }}
                //style={styles}
                value={values.phone}
                onChangeText={handleChange('phone')}
              />
              <View style={styles.boxWallet}>
                <Text style={styles.txtCash}>e-wallet Cash</Text>
                <Text style={styles.saldo}>
                  <Text style={styles.txtSaldo}>Saldo</Text>{' '}
                  {'Rp.' + currencyFormat(JSON.parse(state.user).saldo)}
                </Text>
              </View>
              <Input
                label="Ammount Transfer"
                placeholder="0"
                keyboardType="numeric"
                value={values.ammount}
                onChangeText={handleChange('ammount')}
                errorStyle={{color: 'red', fontSize: 14}}
                errorMessage={
                  JSON.parse(state.user).saldo < values.ammount
                    ? 'Insufficient saldo'
                    : null
                }
              />
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.btnText}>TRANSFER</Text>
              </Button>
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
