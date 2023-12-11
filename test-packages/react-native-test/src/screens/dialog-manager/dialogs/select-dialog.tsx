import React from 'react';
import { DialogComponent } from '@react-stateless-dialog/core';
import { ScrollView, Text, View } from 'react-native';

export const SelectDialog: DialogComponent<null, null> = (props) => {
  const { args, onCancel, onConfirm } = props;

  return (
    <View style={{ backgroundColor: 'white', paddingTop: 30 }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 }}>
        <View>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
          <Text>AAAAA</Text>
        </View>
      </ScrollView>
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
SelectDialog.containerStyle = { maxHeight: '50%' };
