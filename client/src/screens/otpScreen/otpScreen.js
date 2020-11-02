import React, {useEffect, useState, createRef} from 'react';
import {View, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {styles} from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

export const otpScreen = () => {
  const navigation = useNavigation();
  const circularProgress = createRef();
  const [random, setRandom] = useState(Math.random());
  const [show, setShow] = useState(false);
  const otp = 35321;

  const handleResend = () => {
    //circularProgress.current.animate(0, 0);
    setShow(false);
    setRandom(Math.random());
    //circularProgress.current.animate(100, 60000);
    handleComplete();
  };

  const handleMatch = (code) => {
    //console.log(code);
    //code == otp ? alert('sama') : alert('tidak sama');
    code == '00000' ? navigation.navigate('Pin') : null;
  };

  const handleComplete = () => {
    circularProgress.current.reAnimate(0, 100, 65000);
  };

  useEffect(() => {
    handleComplete();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={false}
      />
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -20,
          }}>
          <CountDown
            key={random}
            until={60}
            size={30}
            onFinish={() => setShow(true)}
            digitStyle={{backgroundColor: '#ffffff'}}
            digitTxtStyle={{
              color: '#1E32FA',
              fontFamily: 'SFPro-Bold',
              fontSize: 32,
            }}
            timeToShow={['S']}
            timeLabels={{s: ' '}}
          />
          <Text style={styles.txtHeader}>seconds</Text>
        </View>
        <Text style={styles.txtSubHeader}>
          Please enter the OTP sent on your mobile phone number
        </Text>
        <Text style={styles.txtPhone}>Verification Code</Text>
        <OTPInputView
          style={styles.otpContainer}
          pinCount={5}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          //autoFocusOnLoad
          //clearInputs
          codeInputFieldStyle={styles.otp}
          onCodeFilled={(code) => handleMatch(code)}
        />
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}
          activeOpacity={1}
          onPress={handleResend}>
          <Icon name="reload-circle-sharp" size={30} color="#1E32FA" />
          <Text style={styles.txtResend}> SEND AGAIN</Text>
        </TouchableOpacity>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={0}
          backgroundWidth={5}
          lineCap="round"
          //arcSweepAngle={240}
          rotation={0}
          tintColor="#1E32FA"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#00e0ff"
          ref={circularProgress}
          style={{display: 'flex', alignItems: 'center', marginTop: 50}}
        />
      </View>
    </>
  );
};
