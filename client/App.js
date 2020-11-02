import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContextProvider} from './src/context/userContext';
import {API, setAuthToken} from './src/config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './src/context/userContext';
import {
  onBoarding,
  getStarted,
  otpScreen,
  loginScreen,
  pinScreen,
  homeScreen,
  Board,
  detailTransaction,
  detailTransactionSend,
  sendScreen,
} from './src/screens';
import {LogBox} from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Boarding">
          <Stack.Screen name="Boarding" component={onBoarding} />
          <Stack.Screen name="Started" component={getStarted} />
          <Stack.Screen name="Login" component={loginScreen} />
          <Stack.Screen name="Pin" component={pinScreen} />
          <Stack.Screen name="OTP" component={otpScreen} />
          <Stack.Screen name="Home" component={homeScreen} />
          <Stack.Screen name="detail" component={detailTransaction} />
          <Stack.Screen name="detail_send" component={detailTransactionSend} />
          <Stack.Screen name="send" component={sendScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
