import React, {useState, useEffect} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {Button} from '../../components';
import {TextInput} from 'react-native-gesture-handler';

export const getStarted = (props) => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    console.log('oke');
  }, []);

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
          style={{position: 'absolute', top: -50, zIndex: 0}}
        />
        <Text style={styles.txtHeader}>Get Started</Text>
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
          <Button
            style={styles.button}
            onPress={() => navigation.navigate('OTP')}>
            <Text style={styles.btnText}>Get Started</Text>
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
      </View>
    </>
  );
};
