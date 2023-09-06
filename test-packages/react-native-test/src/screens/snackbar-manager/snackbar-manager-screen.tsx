import React from 'react';
import { Button, View } from 'react-native';
import { SnackbarManager } from '@react-stateless-dialog/core/src';
import { BannerSnackbar } from './snackbars/banner-snackbar';
import CheckBox from '@react-native-community/checkbox';

export const SnackbarManagerScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Snackbar (None)"
        onPress={async () => {
          SnackbarManager().push(
            BannerSnackbar,
            { message: 'Hello world' },
            { duration: 2000, vertical: 'center', horizontal: 'center', animationType: 'none' },
          );
        }}
      />
      <Button
        title="Snackbar (Slide)"
        onPress={async () => {
          SnackbarManager().push(
            BannerSnackbar,
            { message: 'Hello world' },
            { duration: 2000, vertical: 'center', horizontal: 'center', animationType: 'slide' },
          );
        }}
      />
      <Button
        title="Snackbar (Fade)"
        onPress={async () => {
          SnackbarManager().push(
            BannerSnackbar,
            { message: 'Hello world' },
            { duration: 2000, vertical: 'center', horizontal: 'center', animationType: 'fade' },
          );
        }}
      />
      <View>
        <CheckBox value={true} /*onValueChange={(newValue) => setToggleCheckBox(newValue)}*/ />
      </View>
    </View>
  );
};
