import React from 'react';
import { DialogComponent } from '@react-stateless-dialog/core';
import { Text, View } from 'react-native';

export const SelectDialog: DialogComponent<null, null> = (props) => {
  const { args, onCancel, onConfirm } = props;

  return (
    <View style={{ backgroundColor: 'white', alignItems: 'center', padding: 20 }}>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
      <Text>AAAAA</Text>
    </View>
  );
};

SelectDialog.androidCancelOnClickBack = false;
SelectDialog.quitOnTouchOutside = true;
SelectDialog.animationType = 'slide';
SelectDialog.enableGesture = true;
SelectDialog.disableSafeArea = true;
SelectDialog.horizontal = 'stretch';
SelectDialog.vertical = 'bottom';
