import React, {useState} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {useMutation} from 'react-query';
import {styles} from './style';
import {Button} from '../../components';
import {TextInput} from 'react-native-gesture-handler';
import {API} from '../../config/api';

export const loginScreen = (props) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [message, setErrorMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [loginAction, {isLoading, error}] = useMutation(async () => {
    try {
      //try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({uid: 0 + phone});

      const res = await API.post('/login', body, config);
      //console.log(res.data.data.uid);
      props.navigation.navigate('Pin', {uid: res.data.data.uid});

      //await AsyncStorage.setItem('token', res.data.data.token);

      // dispatch({
      //   type: 'LOGIN_SUCCESS',
      //   payload: res.data.data,
      // });

      //console.log(res.data.data.token);

      //setAuthToken(res.data.data.token);

      // try {
      //   const res = await API.get("/auth");
      //   dispatch({
      //     type: "USER_LOADED",
      //     payload: JSON.stringify(res.data.data.user),
      //   });
      // } catch (err) {
      //   dispatch({
      //     type: "AUTH_ERROR",
      //   });
      // }

      //   props.navigation.navigate("Home");
      // } catch (err) {
      //   onToggleSnackBar();
      //   dispatch({
      //     type: "LOGIN_FAILED",
      //   });
      //   setErrorMsg(err.response.data.error.message);
      // }
    } catch (err) {
      onToggleSnackBar();
      console.log(err);
      setErrorMsg(err.response.data.error.message);
    }
  });

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <View style={styles.container}>
        <Image
          source={require('../../asset/img/2.png')}
          style={{position: 'absolute', top: -50}}
        />
        <Text style={styles.txtHeader}>Sign In</Text>
        <View style={styles.dockerBottom}>
          <Text style={styles.txtSubHeader}>
            Please enter the mobile phone number
          </Text>
          <Text style={styles.txtPhone}>Phone Number</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txtPhoneNumber}>+62</Text>
            <TextInput
              onChangeText={(e) => setPhone(e)}
              placeholder="81335241314"
              value={phone}
              style={styles.txtInputPhone}
              keyboardType="numeric"
              maxLength={11}
            />
          </View>
          <Button style={styles.button} onPress={() => loginAction()}>
            <Text style={styles.btnText}>Sign In</Text>
          </Button>
          <Text style={styles.txtAccount}>
            Don't have an account?{' '}
            <Text
              style={styles.txtBottom}
              onPress={() => navigation.navigate('Started')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {message}
      </Snackbar>
    </>
  );
};
