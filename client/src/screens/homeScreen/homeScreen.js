import React, {useState, useContext} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {ListTransaction, Button} from '../../components';
import {useMutation, useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
//import {formatRupiah} from '../../utils/formatRupiah';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API, urlAsset} from '../../config/api';

function currencyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const homeScreen = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const user = JSON.parse(state.user);

  const {
    isLoading: loadingProfile,
    data: userData,
    refetch: refetchProfile,
  } = useQuery('getUserProfile', () => API.get(`/user/${user.id}`));

  const {isLoading, data: transactionData, refetch} = useQuery(
    'getTransaction',
    () => API.get(`/transaction-user/${user.id}`),
  );

  const renderItem = ({item}) => {
    return (
      <ListTransaction
        key={item.id}
        image={
          item.type === 1
            ? urlAsset.img + item.receiver.photo
            : urlAsset.img + item.sender.photo
        }
        name={
          item.type === 1
            ? item.receiver.first_name + ' ' + item.receiver.last_name
            : item.sender.first_name + ' ' + item.sender.last_name
        }
        ammount={
          item.type === 1
            ? '-' + currencyFormat(item.ammount)
            : '+' + currencyFormat(item.ammount)
        }
        date={item.date}
        time={item.time}
        description="Test"
        style={{
          backgroundColor: color.white,
          paddingLeft: 0,
          paddingRight: 0,
        }}
        color={color.black}
        colorAmmount={item.type === 1 ? color.red : color.green}
        onPress={() =>
          props.navigation.navigate('detail', {
            id_trx: item.id,
            type: item.type,
          })
        }
      />
    );
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
          text: 'e-wallet',
          style: {
            color: color.black,
            fontSize: 28,
            fontFamily: 'SFPro-Bold',
          },
        }}
        rightComponent={<Icon type="fontisto" name="move-h-a" size={30} />}
        rightContainerStyle={{right: 10}}
        placement="left"
        containerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.container}>
        {/* <Text style={styles.top}>Account Overview</Text> */}
        <View style={styles.box}>
          <View
            style={{
              height: '100%',
              justifyContent: 'space-around',
            }}>
            <Text style={styles.saldo}>
              {loadingProfile
                ? 'loading...'
                : currencyFormat(userData.data.data.user.saldo)}
            </Text>
            <Text style={styles.balance}>Current balance</Text>
          </View>
          <Icon
            type="ionicon"
            name="reload-circle-sharp"
            size={40}
            color={color.white}
            onPress={refetchProfile}
          />
        </View>
        <View style={styles.boxBtn}>
          <Button
            style={styles.buttonLeft}
            onPress={() => navigation.navigate('send')}>
            <Text style={styles.btnText}>Send</Text>
          </Button>
          <Button style={styles.buttonRight}>
            <Text style={styles.btnTextRight}>Topup</Text>
          </Button>
        </View>
        <View style={styles.boxRecent}>
          <Text style={styles.txtRecent}>RECENT TRANSACTIONS</Text>
          <Icon
            type="ionicon"
            name="reload-circle-sharp"
            size={30}
            color={color.primary}
            onPress={refetch}
          />
        </View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={transactionData.data.data.transactions}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};
