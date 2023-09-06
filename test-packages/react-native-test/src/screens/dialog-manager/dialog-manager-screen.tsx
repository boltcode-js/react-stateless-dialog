import React from 'react';
import { Button, View } from 'react-native';
import { DialogManager } from '@react-stateless-dialog/core/src';
import { ConfirmDialog } from './dialogs/confirm-dialog';
import { KeyboardDialog } from './dialogs/keyboard-dialog';

export const DialogManagerScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Confirm dialog"
        onPress={async () => {
          await DialogManager().push(ConfirmDialog, { message: 'Hello world' }).waitIgnoreCancel();
        }}
      />
      <Button
        title="Keyboard Dialog (no behavior)"
        onPress={async () => {
          await DialogManager().push(KeyboardDialog, null, { quitOnTouchOutside: true, backgroundColor: 'blue' }).waitIgnoreCancel();
        }}
      />
      <Button
        title="Keyboard Dialog (padding)"
        onPress={async () => {
          await DialogManager().push(KeyboardDialog, null, { keyboardBehavior: 'padding', quitOnTouchOutside: true }).waitIgnoreCancel();
        }}
      />
      <Button
        title="Slide animation"
        onPress={async () => {
          await DialogManager().push(ConfirmDialog, { message: 'Hello world' }, { animationType: 'slide' }).waitIgnoreCancel();
        }}
      />
      <Button
        title="Fade animation"
        onPress={async () => {
          await DialogManager().push(ConfirmDialog, { message: 'Hello world' }, { animationType: 'fade' }).waitIgnoreCancel();
        }}
      />
    </View>
  );
};
