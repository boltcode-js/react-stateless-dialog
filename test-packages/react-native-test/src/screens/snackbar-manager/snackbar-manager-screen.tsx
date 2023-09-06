import React from 'react';
import { Button, View } from 'react-native';
import { SnackbarManager } from '@react-stateless-dialog/core/src';
import { BannerSnackbar } from './snackbars/banner-snackbar';

export const SnackbarManagerScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Snackbar"
        onPress={async () => {
          SnackbarManager().push(BannerSnackbar, { message: 'Hello world' }, { duration: 2000, vertical: 'bottom' });
        }}
      />
    </View>
  );
};
