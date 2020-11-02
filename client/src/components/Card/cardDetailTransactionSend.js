import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import {urlAsset} from '../../config/api';
import color from '../../utils/color';
import Dash from 'react-native-dash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function currencyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const CardDetailTransactionSend = (props) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const setDate = new Date(props.data.date);
  const month = monthNames[setDate.getMonth()];
  const split = props.data.date.split('-');
  const fullDate = split.pop() + ' ' + month + ' ' + split[0];

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.box,
          borderColor: color.white,
        }}>
        <Icon
          type="antdesign"
          name={'checkcircle'}
          size={width / 4 - 15}
          color={color.white}
        />
      </View>
      <View style={styles.boxRadius}>
        <Text
          style={{
            ...styles.txtInfo,
            color: color.primary,
          }}>
          {'Success'}
        </Text>
        <View style={styles.roundLeft} />
        <Dash style={{height: 1, top: -15}} dashColor={color.primary} />
        <View style={styles.roundRight} />

        <Text style={styles.txtDate}>{fullDate + ' ' + props.data.time}</Text>
        <Text style={styles.ammount}>{currencyFormat(props.data.ammount)}</Text>
        <Text style={styles.txtID}>Transaction ID : {props.data.txid}</Text>
        <Text style={styles.from}>From</Text>
        <ListItem containerStyle={styles.listItem}>
          <Avatar
            rounded
            source={{
              uri: urlAsset.img + props.data.sender.photo,
            }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                color: color.black,
                fontFamily: 'SFPro-SemiBold',
                fontSize: 16,
              }}>
              {props.data.sender.first_name + ' ' + props.data.sender.last_name}
            </ListItem.Title>
            <ListItem.Subtitle>
              e-wallet - {props.data.sender.uid}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Text style={styles.from}>To</Text>
        <ListItem containerStyle={styles.listItem}>
          <Avatar
            rounded
            source={{
              uri: urlAsset.img + props.data.receiver.photo,
            }}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                color: color.black,
                fontFamily: 'SFPro-SemiBold',
                fontSize: 16,
              }}>
              {props.data.receiver.first_name +
                ' ' +
                props.data.receiver.last_name}
            </ListItem.Title>
            <ListItem.Subtitle>
              e-wallet - {props.data.receiver.uid}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
  },
  top: {
    color: color.black,
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'SFPro-SemiBold',
  },
  box: {
    width: width / 4,
    height: width / 4,
    backgroundColor: color.primary,
    borderRadius: width / 4 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.green,
    borderWidth: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: width / 5,
    zIndex: 999,
  },
  boxRadius: {
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 20,
    height: height - height / 3.35,
    top: -(width / 4 / 2),
    zIndex: 0,
  },
  roundLeft: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    left: -15,
    top: width / 4.5,
    backgroundColor: color.primary,
  },
  roundRight: {
    position: 'absolute',
    right: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    top: width / 4.5,
    backgroundColor: color.primary,
  },
  txtInfo: {
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
    marginTop: 5,
    color: color.green,
    marginBottom: width / 10,
    marginTop: width / 15,
    textAlign: 'center',
  },
  txtDate: {
    fontSize: 16,
    fontFamily: 'SFPro-Light',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: color.black,
  },
  ammount: {
    fontSize: 32,
    fontFamily: 'SFPro-SemiBold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: color.black,
  },
  balance: {
    fontSize: 16,
    color: color.white,
    fontFamily: 'SFPro-Regular',
  },
  txtID: {
    marginTop: 20,
    fontFamily: 'SFPro-Light',
    color: color.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  from: {
    fontFamily: 'SFPro-Light',
    color: 'grey',
    fontSize: 14,
    marginBottom: -10,
  },
});
