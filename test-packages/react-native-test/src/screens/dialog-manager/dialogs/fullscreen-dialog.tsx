import React from 'react';
import { Button, View } from 'react-native';
import { DialogContext } from '@react-stateless-dialog/core';

export const FullscreenDialog = (props: DialogContext<null, null>) => {
  const { onCancel } = props;
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};
