import React from 'react';
import { Button, Text, View } from 'react-native';
import { SnackbarComponent } from '@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-component';

export const ToastSnackbar: SnackbarComponent<{ message: string }> = (props) => {
  const { args, onClose } = props;

  return (
    <View style={{ borderWidth: 1, backgroundColor: 'orange', padding: 20, flexDirection: 'row', alignItems: 'center' }}>
      <Text>{args.message}</Text>
      <Button title="(close)" onPress={onClose} />
    </View>
  );
};