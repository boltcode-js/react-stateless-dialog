import React, { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { DialogContext } from '@react-stateless-dialog/core/src';

export const TestDialog = (props: DialogContext<null, null>) => {
  const handleOpenDialog = useCallback(async () => {
    // await pushDialog(ConfirmDialog, { message: 'Hello world' }).waitIgnoreCancel();
  }, []);

  return (
    <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ textAlign: 'center' }}>Hey, this is a test dialog</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Ask confirmation" onPress={handleOpenDialog} />
        <Button title="Close" onPress={() => props.onConfirm(null)} />
      </View>
    </View>
  );
};
