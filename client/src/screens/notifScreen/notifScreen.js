import React, {useState, useContext, useRef} from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {Icon, Header} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {ListNotification, Button} from '../../components';
import {useMutation, useQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import color from '../../utils/color';
//import {formatRupiah} from '../../utils/formatRupiah';
import {styles} from './style';
import {UserContext} from '../../context/userContext';
import {API} from '../../config/api';
import BottomSheet from 'reanimated-bottom-sheet';
import {useIsDrawerOpen} from '@react-navigation/drawer';

function currencyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const notifScreen = (props) => {
  const navigation = useNavigation();
  const [detail, setItem] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const user = JSON.parse(state.user);
  const sheetRef = useRef(null);
  const isDrawerOpen = useIsDrawerOpen();

  const {isLoading, data: notifData, refetch} = useQuery(
    'getNotification',
    () => API.get(`/notification`),
  );

  const renderItem = ({item}) => {
    return (
      <ListNotification
        key={item.id}
        title={item.title}
        body={item.body}
        date={item.createdAt}
        description="Test"
        style={{
          backgroundColor: item.read == 1 ? color.white : color.grey,
          marginBottom: 10,
          borderRadius: 10,
        }}
        color={'rgba(0,0,0,0.6)'}
        // onPress={() =>
        //   props.navigation.navigate('detail', {
        //     id_trx: item.id,
        //     type: item.type,
        //   })
        // }
        onPress={() => {
          setItem(item);
          sheetRef.current.snapTo(0);
        }}
      />
    );
  };

  const renderSheetDialog = (data) => (
    <View>
      <View
        style={{
          backgroundColor: 'grey',
          alignItems: 'center',
          height: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: color.white,
            height: 6,
            width: '10%',
            borderRadius: 6,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{detail.body}</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar
        backgroundColor={isDrawerOpen ? color.primary : color.white}
        barStyle={isDrawerOpen ? 'light-content' : 'dark-content'}
        translucent={false}
      />
      <Header
        centerComponent={{
          text: 'Notifications',
          style: {
            color: color.black,
            fontSize: 28,
            fontFamily: 'SFPro-Bold',
          },
        }}
        rightComponent={
          <Icon
            type="fontisto"
            name="move-h-a"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        }
        rightContainerStyle={{right: 10}}
        placement="left"
        containerStyle={{backgroundColor: color.white}}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={notifData.data.data.notifications}
            renderItem={renderItem}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomSheet
        initialSnap={1}
        ref={sheetRef}
        snapPoints={[220, 0, 0]}
        borderRadius={20}
        //renderHeader={renderHeader}
        renderContent={renderSheetDialog}
        enabledManualSnapping={false}
      />
    </>
  );
};
