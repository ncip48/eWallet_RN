import React from 'react';
import {View, TouchableOpacity} from 'react-native';

export const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.style}
      activeOpacity={1}>
      {props.children}
    </TouchableOpacity>
  );
};
