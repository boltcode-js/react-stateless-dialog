import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SnackbarComponent } from '@react-stateless-dialog/core';

export const ToastSnackbar: SnackbarComponent<{ message: string }> = (props) => {
  const { args, onClose, destroy } = props;

  const [isOn, setOn] = useState(false);

  return (
    <View style={{ borderWidth: 1, backgroundColor: 'orange', padding: 20, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{args.message}</Text>
        <Button title="(destroy)" onPress={destroy} />
        <Button title="(close)" onPress={onClose} />
      </View>
      <Button title="Add " onPress={() => setOn((toggle) => !toggle)} />
      {isOn && <View style={{ height: 50, width: 50, backgroundColor: 'red' }} />}
    </View>
  );
};
