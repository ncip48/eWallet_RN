import React, {useState, useContext} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {CardDetailTopUp} from '../../components';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
//import {formatRupiah} from '../../utils/formatRupiah';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API} from '../../config/api';

export const detailTopUpScreen = (props) => {
  const navigation = useNavigation();
  const {data} = props.route.params;
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <StatusBar
        backgroundColor={color.primary}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        leftComponent={
          <Icon
            type="antdesign"
            name="close"
            size={20}
            onPress={() => navigation.navigate('Home')}
            containerStyle={{
              backgroundColor: color.white,
              padding: 5,
              borderRadius: 20,
            }}
          />
        }
        leftContainerStyle={{left: 10}}
        containerStyle={{
          backgroundColor: color.primary,
        }}
      />
      <View style={styles.container}>
        <CardDetailTopUp data={data} />
      </View>
    </>
  );
};
