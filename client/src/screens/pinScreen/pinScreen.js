import React, {useState, useContext} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API, setAuthToken} from '../../config/api';

export const pinScreen = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const {uid} = props.route.params;
  const [state, dispatch] = useContext(UserContext);

  // const handleMatch = (code) => {
  //   code == '00000' ? navigation.navigate('Pin') : null;
  // };

  const [message, setErrorMsg] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [handlePin, {isLoading, error}] = useMutation(async (code) => {
    try {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify({uid: uid, pin: code});

        const res = await API.post('/pin', body, config);
        //console.log(res.data);

        await AsyncStorage.setItem('token', res.data.data.token);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data.data,
        });

        //console.log(res.data.data.token);

        setAuthToken(res.data.data.token);

        try {
          const res = await API.get('/auth');
          dispatch({
            type: 'USER_LOADED',
            payload: JSON.stringify(res.data.data.user),
          });
        } catch (err) {
          dispatch({
            type: 'AUTH_ERROR',
          });
        }

        props.navigation.navigate('Home');
      } catch (err) {
        onToggleSnackBar();
        dispatch({
          type: 'LOGIN_FAILED',
        });
        setErrorMsg(err.response.data.error.message);
      }
    } catch (err) {
      onToggleSnackBar();
      //console.log(err);
      setErrorMsg(err.response.data.error.message);
    }
  });

  return (
    <>
      <StatusBar
        backgroundColor="#1E32FA"
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.container}>
        <Image
          source={require('../../asset/img/3.png')}
          style={{position: 'absolute', top: 10}}
        />
        {/* <View style={styles.wrapperProfile}>
          <Image
            source={require('../../asset/img/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.txtProfile}>Herly Chahya</Text>
        </View> */}
        <View style={styles.dockerBottom}>
          <Text style={styles.txtSubHeader}>Welcome Back!</Text>
          <Text style={styles.txtPhone}>Login with Pin</Text>
          <OTPInputView
            style={styles.otpContainer}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            //autoFocusOnLoad
            codeInputFieldStyle={styles.otp}
            onCodeFilled={(code) => handlePin(code)}
          />
          <Icon
            name="finger-print-outline"
            size={60}
            color="#1E32FA"
            style={styles.iconFingerprint}
          />
          <Text style={styles.txtFingerprint}>Login using Fingerprint</Text>
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
