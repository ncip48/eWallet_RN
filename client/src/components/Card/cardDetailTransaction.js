import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import {urlAsset} from '../../config/api';
import color from '../../utils/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function currencyFormat(num) {
  return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const CardDetailTransaction = (props) => {
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
    <>
      {props.isLoading ? (
        <Text>loading...</Text>
      ) : (
        <>
          <View
            style={{
              ...styles.box,
              borderColor: props.error ? color.red : color.green,
            }}>
            <Icon
              type="antdesign"
              name={props.error ? 'closecircle' : 'checkcircle'}
              size={width / 4 - 15}
              color={props.error ? color.red : color.green}
            />
          </View>
          <Text
            style={{
              ...styles.txtInfo,
              color: props.error ? color.red : color.green,
            }}>
            {props.error ? 'Failed' : 'Success'}
          </Text>
          {props.error ? (
            <Text style={styles.txtDate}>{props.error.message}</Text>
          ) : (
            <>
              <Text style={styles.txtDate}>
                {fullDate + ' ' + props.data.time}
              </Text>
              <Text style={styles.ammount}>
                {props.data.type === 0
                  ? '+' + currencyFormat(props.data.ammount)
                  : '-' + currencyFormat(props.data.ammount)}
              </Text>
              <Text style={styles.txtDetail}>Detail Transaction</Text>
              <ListItem containerStyle={styles.listItem}>
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri:
                      props.data.type === 1
                        ? urlAsset.img + props.data.receiver.photo
                        : urlAsset.img + props.data.sender.photo,
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: color.black,
                      fontFamily: 'SFPro-SemiBold',
                      fontSize: 18,
                      marginBottom: 5,
                    }}>
                    {props.data.type === 1
                      ? 'To ' +
                        props.data.receiver.first_name +
                        ' ' +
                        props.data.receiver.last_name
                      : 'From ' +
                        props.data.sender.first_name +
                        ' ' +
                        props.data.sender.last_name}
                  </ListItem.Title>
                  <ListItem.Subtitle>{props.data.trx}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
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
    backgroundColor: color.white,
    borderRadius: width / 4 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.green,
    borderWidth: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: width / 10,
  },
  txtInfo: {
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
    marginTop: 5,
    color: color.green,
    marginBottom: width / 10,
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
    fontSize: 24,
    fontFamily: 'SFPro-Bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: color.black,
  },
  balance: {
    fontSize: 16,
    color: color.white,
    fontFamily: 'SFPro-Regular',
  },
  txtDetail: {
    marginTop: 20,
    fontFamily: 'SFPro-SemiBold',
    color: color.black,
    fontSize: 16,
    //marginBottom: 10,
  },
});
