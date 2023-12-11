import React from 'react';
import { Button, View } from 'react-native';
import { DialogComponent } from '@react-stateless-dialog/core';

export const FullscreenDialog: DialogComponent<null, null> = (props) => {
  const { onCancel } = props;
  return (
    <View style={{ /*width: '100%', height: '100%'*/ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

FullscreenDialog.containerStyle = { flex: 1 };
FullscreenDialog.horizontal = 'stretch';
FullscreenDialog.animationType = 'slide';
