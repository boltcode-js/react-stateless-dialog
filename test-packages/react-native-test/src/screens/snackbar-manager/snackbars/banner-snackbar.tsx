import React from 'react';
import { Button, Text, View, ViewStyle } from 'react-native';
import { SnackbarComponent } from '@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BannerSnackbar: SnackbarComponent<{ message: string }> = (props) => {
  const { args, config, onClose } = props;

  const insets = useSafeAreaInsets();

  const style: ViewStyle = { borderWidth: 1, backgroundColor: 'orange', padding: 20, flexDirection: 'row' };
  if (config.vertical === 'top') {
    style.paddingTop = 20 + insets.top;
  } else if (config.vertical === 'bottom') {
    style.paddingBottom = 20 + insets.bottom;
  }

  return (
    <View style={style}>
      <Text>{args.message}</Text>
      <Button title="(close)" onPress={onClose} />
    </View>
  );
};
