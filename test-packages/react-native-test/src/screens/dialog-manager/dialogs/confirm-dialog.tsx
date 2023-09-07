import React from 'react';
import { Button, Text, View } from 'react-native';
import { DialogContext } from '@react-stateless-dialog/core';

export const ConfirmDialog = (props: DialogContext<{ message: string }, boolean>) => {
  const { args, onConfirm, onCancel } = props;
  return (
    <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 20 }}>
      <Text>Confirmation</Text>
      <Text style={{ marginVertical: 10 }}>{args.message}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Confirm" onPress={() => onConfirm(true)} />
      </View>
    </View>
  );
};
