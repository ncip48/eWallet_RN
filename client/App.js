import React, {useContext, useEffect, createContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContextProvider} from './src/context/userContext';
import styled from 'styled-components/native';
import Animated, {
  interpolate,
  interpolateColors,
} from 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  onBoarding,
  getStarted,
  otpScreen,
  loginScreen,
  pinScreen,
  homeScreen,
  notifScreen,
  detailTransaction,
  detailTransactionSend,
  sendScreen,
} from './src/screens';
import {LogBox, StatusBar, Text, View} from 'react-native';
import _ from 'lodash';
//import {withFancyDrawer} from './withFancyHeader';
import color from './src/utils/color';
import {Icon, Avatar} from 'react-native-elements';
import {UserContext} from './src/context/userContext';
import {urlAsset} from './src/config/api';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
const AnimatedContext = createContext(void 0);

const Drawer = createDrawerNavigator();

function withFancyDrawer(Component) {
  function Wrapper({children}) {
    const animated = useContext(AnimatedContext);
    const scale = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const translateMainCard = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [0, 20],
    });
    const backgroundColorAnimated = interpolateColors(animated, {
      inputRange: [0, 1],
      outputColorRange: [color.white, color.primary],
    });
    const animatedBorderRadius = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [0, 30],
    });
    const translateTransparentCard = interpolate(animated, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, -50],
    });
    const CardAnimated = Animated.createAnimatedComponent(Card);

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: color.primary,
        }}>
        <TransitionContainer
          style={{transform: [{scale, translateX: translateMainCard}]}}>
          <TransparentCard
            style={{
              transform: [{translateX: translateTransparentCard}, {scale: 0.9}],
            }}
          />
          <CardAnimated style={{borderRadius: animatedBorderRadius}}>
            {children}
          </CardAnimated>
        </TransitionContainer>
      </Animated.View>
    );
  }
  return (props) => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
}

function CustomDrawerContent(props) {
  const [state] = useContext(UserContext);
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: '100%',
          aspectRatio: 1.5,
          marginLeft: 30,
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Avatar
          rounded
          size="large"
          containerStyle={{width: 60, height: 60}}
          source={{
            uri: urlAsset.img + JSON.parse(state.user).photo,
          }}
        />
        <Text
          style={{
            fontSize: 26,
            color: color.white,
            fontFamily: 'SFPro-Bold',
            marginTop: 10,
          }}>
          {JSON.parse(state.user).first_name +
            ' ' +
            JSON.parse(state.user).last_name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'SFPro-Regular',
            //marginTop: 5,
          }}>
          {JSON.parse(state.user).email}
        </Text>
      </View>
      <DrawerItemList
        inactiveBackgroundColor={'transparent'}
        inactiveTintColor={'white'}
        activeBackgroundColor={'transparent'}
        activeTintColor={'white'}
        labelStyle={{
          fontFamily: 'SFPro-Regular',
          fontSize: 16,
          marginLeft: -20,
        }}
        itemStyle={{marginLeft: 20}}
        {...props}
      />
      <View
        style={{
          width: '100%',
          aspectRatio: 1.5,
          marginLeft: 35,
          justifyContent: 'center',
          //marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'SFPro-SemiBold',
            //marginTop: 5,
          }}>
          Logout
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

const DrawerStack = () => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  return (
    <AnimatedContext.Provider value={animatedValue}>
      <View style={{backgroundColor: color.primary, flex: 1}}>
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: 'transparent',
          }}
          drawerType={'slide'}
          initialRouteName="Home"
          overlayColor="transparent"
          drawerContent={(props) => {
            setAnimatedValue(props.progress);
            return <CustomDrawerContent {...props} />;
          }}>
          <Drawer.Screen
            name="Home"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="home"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(homeScreen)}
          />
          <Drawer.Screen
            name="Notifications"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="bell"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(notifScreen)}
          />
          <Drawer.Screen
            name="All Transactions"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="history"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(homeScreen)}
          />
          <Drawer.Screen
            name="Rewards & Offers"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="tag"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(homeScreen)}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="cog"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(homeScreen)}
          />
        </Drawer.Navigator>
      </View>
    </AnimatedContext.Provider>
  );
};

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        {/* <StatusBar backgroundColor={color.primary} barStyle="dark-content" /> */}
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
          <Stack.Screen name="Home" component={DrawerStack} />
          <Stack.Screen name="detail" component={detailTransaction} />
          <Stack.Screen name="detail_send" component={detailTransactionSend} />
          <Stack.Screen name="send" component={sendScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;

const TransitionContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TransparentCard = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.3;
  border-radius: 30px;
`;
const Card = styled.View`
  width: 100%;
  height: 100%;
  ${'' /* border-radius: 30px; */}
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;
