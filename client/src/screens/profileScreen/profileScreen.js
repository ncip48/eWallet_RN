import React, {useState, useContext} from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API, urlAsset} from '../../config/api';

export const profileScreen = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const user = JSON.parse(state.user);
  const doLogout = async () => {
    await AsyncStorage.removeItem('token');
    props.navigation.navigate('Boarding');
  };
  return (
    <>
      <StatusBar
        backgroundColor={color.white}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        centerComponent={{
          text: 'eWallet',
          style: {color: color.black, fontSize: 28},
        }}
        rightComponent={<Icon type="fontisto" name="move-h-a" size={30} />}
        rightContainerStyle={{right: 10}}
        placement="left"
        containerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.container}>
        <Text style={styles.top}>Account Overview</Text>
        <View style={styles.wrapperProfile}>
          <Image
            source={{uri: urlAsset.img + user.photo}}
            style={styles.avatar}
          />
          <Text style={styles.txtProfile}>{user.first_name}</Text>
        </View>
        <Text style={styles.txtSubHeader}>Welcome Back!</Text>
        <Text style={styles.txtPhone}>Login with Pin</Text>
        <Text style={styles.txtFingerprint}>Login using Fingerprint</Text>
      </View>
    </>
  );
};
