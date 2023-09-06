import React, { useMemo } from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { SnackbarComponent } from '@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { invertColor } from '@react-stateless-dialog/core/src/utils/utils';

export const BannerSnackbar: SnackbarComponent<{ message: string }> = (props) => {
  const { args, config } = props;

  const insets = useSafeAreaInsets();

  const style = useMemo(() => {
    const _style: ViewStyle = { backgroundColor: 'orange', padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' };
    if (config.vertical === 'top') {
      _style.paddingTop = 10 + insets.top;
    } else if (config.vertical === 'bottom') {
      _style.paddingBottom = 10 + insets.bottom;
    }
    return _style;
  }, [config.vertical, insets.bottom, insets.top]);

  return (
    <View style={style}>
      <Text style={{ color: invertColor('orange', true), fontSize: 18, textAlign: 'center' }}>{args.message}</Text>
    </View>
  );
};

BannerSnackbar.insideSafeArea = false;
BannerSnackbar.vertical = 'top';
BannerSnackbar.horizontal = 'center';
BannerSnackbar.animationType = 'slide';
