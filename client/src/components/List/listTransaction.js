import React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {urlAsset} from '../../config/api';
import color from '../../utils/color';
import TimeAgo from 'react-native-timeago';

export const ListTransaction = (props) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const setDate = new Date(props.date);
  const month = monthNames[setDate.getMonth()];
  const split = props.date.split('-');
  const fullDate = split.pop() + ' ' + month + ' ' + split[0];

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <ListItem containerStyle={props.style}>
        <Avatar
          rounded
          size="medium"
          source={{uri: props.image}}
          //containerStyle={{height: 50, width: 50}}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: color.black,
              fontFamily: 'SFPro-Bold',
              fontSize: 16,
              marginBottom: 5,
            }}>
            {props.name}
          </ListItem.Title>
          <ListItem.Subtitle>
            {props.date === new Date().toISOString().split('T')[0] ? (
              <TimeAgo time={props.date + 'T' + props.time} interval={20000} />
            ) : (
              <TimeAgo time={props.date + 'T' + props.time} interval={20000} />
            )}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text
          style={{
            color: props.colorAmmount,
            fontFamily: 'SFPro-Regular',
            fontSize: 14,
            marginLeft: 'auto',
          }}>
          {props.ammount}
        </Text>
      </ListItem>
    </TouchableOpacity>
  );
};
