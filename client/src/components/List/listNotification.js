import React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {urlAsset} from '../../config/api';
import color from '../../utils/color';
import TimeAgo from 'react-native-timeago';

export const ListNotification = (props) => {
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

  const setDate = new Date(props.date);
  const month = monthNames[setDate.getMonth()];
  const split = props.date.split('T')[0].split('-');
  const fullDate = split.pop() + ' ' + month + ' ' + split[0];

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <ListItem containerStyle={props.style}>
        <Avatar
          rounded
          size="medium"
          overlayContainerStyle={{backgroundColor: 'grey'}}
          icon={{
            name: 'email',
            type: 'material-community',
            color: color.white,
            size: 30,
          }}
          //containerStyle={{height: 50, width: 50}}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: color.black,
              fontFamily: 'SFPro-SemiBold',
              fontSize: 14,
            }}>
            {props.title}
          </ListItem.Title>
          <ListItem.Subtitle>{props.body}</ListItem.Subtitle>
        </ListItem.Content>
        <Text
          style={{
            color: color.black,
            fontFamily: 'SFPro-Regular',
            fontSize: 12,
            marginLeft: 'auto',
          }}>
          {props.date.split('T')[0] ===
          new Date().toISOString().slice(0, 19).split('T')[0] ? (
            <TimeAgo time={props.date} interval={20000} />
          ) : (
            fullDate
          )}
        </Text>
      </ListItem>
    </TouchableOpacity>
  );
};
