import React, { useMemo } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { DefaultSnackbarProps, SnackbarComponent, invertColor } from '@react-stateless-dialog/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEFAULT_SNACKBAR_CONFIG = {
  bgColors: {
    error: 'red',
    warn: 'orange',
    info: 'blue',
    success: 'green',
  },
  textStyle: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
  } as TextStyle,
  padding: 10,
};

export const BannerSnackbar: SnackbarComponent<DefaultSnackbarProps> = (props) => {
  const { args, config } = props;

  const insets = useSafeAreaInsets();

  const style = useMemo(() => {
    const _style: ViewStyle = {
      backgroundColor: DEFAULT_SNACKBAR_CONFIG.bgColors[args.type],
      padding: DEFAULT_SNACKBAR_CONFIG.padding,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    };
    if (config.vertical === 'top') {
      _style.paddingTop = DEFAULT_SNACKBAR_CONFIG.padding + insets.top;
    } else if (config.vertical === 'bottom') {
      _style.paddingBottom = DEFAULT_SNACKBAR_CONFIG.padding + insets.bottom;
    }
    return _style;
  }, [config.vertical, insets.bottom, insets.top, args.type]);

  return (
    <View style={style}>
      <Text
        style={[
          DEFAULT_SNACKBAR_CONFIG.textStyle,
          {
            color: invertColor(DEFAULT_SNACKBAR_CONFIG.bgColors[args.type], true),
          },
        ]}>
        {args.message}
      </Text>
    </View>
  );
};

BannerSnackbar.insideSafeArea = false;
BannerSnackbar.vertical = 'top';
BannerSnackbar.horizontal = 'stretch';
BannerSnackbar.animationType = 'slide';
