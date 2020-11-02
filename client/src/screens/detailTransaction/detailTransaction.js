import React, {useState, useContext} from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {CardDetailTransaction} from '../../components';
import {useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
//import {formatRupiah} from '../../utils/formatRupiah';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API} from '../../config/api';

export const detailTransaction = (props) => {
  const navigation = useNavigation();
  const {id_trx, type} = props.route.params;
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const {isLoading, data, refetch, error} = useQuery('detailTrx', () =>
    API.get(`/transaction/${id_trx}`),
  );

  return (
    <>
      <StatusBar
        backgroundColor={color.white}
        barStyle="dark-content"
        translucent={false}
      />
      <Header
        centerComponent={{
          text: 'Detail Transaction',
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
        rightComponent={<Icon type="antdesign" name="staro" size={25} />}
        leftContainerStyle={{left: 10}}
        rightContainerStyle={{right: 10}}
        containerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.container}>
        {isLoading ? null : (
          <CardDetailTransaction
            isLoading={isLoading}
            data={data.data.data.transaction}
            error={error}
          />
        )}
      </View>
    </>
  );
};
