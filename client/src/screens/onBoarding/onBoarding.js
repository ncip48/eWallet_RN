import React, {useContext, useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './style';
import {Button} from '../../components';
import {API, setAuthToken} from '../../config/api';
import {UserContext} from '../../context/userContext';
import {useIsFocused} from '@react-navigation/native';

async function getToken() {
  const token = await AsyncStorage.getItem('token');
  setAuthToken(token);
  //alert(token);
}

getToken();

export const onBoarding = (props) => {
  const navigation = useNavigation();
  const [state, dispatch] = useContext(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get('/auth');
        //console.log('log : ' + res.data.data.user.first_name);
        dispatch({
          type: 'USER_LOADED',
          payload: JSON.stringify(res.data.data.user),
        });
        //alert(res);
        props.navigation.navigate('Home');
      } catch (err) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
    };

    isFocused ? loadUser() : null;
  }, [isFocused]);

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
          style={{position: 'absolute', top: 0, zIndex: 0}}
        />
        <Text style={styles.txtHeader}>Pay Manage Grow...</Text>
        <Text style={styles.subHeader}>
          An Easy app to manage your all payment and finance related needs
        </Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate('Started')}>
          <Text style={styles.txtButton}>Get Started</Text>
        </Button>
        <Text style={styles.txtAccount}>
          Already have account?{' '}
          <Text
            style={styles.txtBottom}
            onPress={() => navigation.navigate('Login')}>
            Sign in
          </Text>
        </Text>
      </View>
    </>
  );
};
