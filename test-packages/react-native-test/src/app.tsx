/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/root-navigator';
import { overrideStatelessDialogConfig, StatelessDialogProvider } from '@react-stateless-dialog/core';
import { StatelessDialogConfigNative } from '@react-stateless-dialog/native';
import { BannerSnackbar } from './screens/snackbar-manager/snackbars/banner-snackbar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const statelessDialogConfig = overrideStatelessDialogConfig(StatelessDialogConfigNative, {
  snackbar: {
    DefaultSnackbar: BannerSnackbar,
    defaultConfig: {
      enableGesture: true,
    },
  },
});

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatelessDialogProvider config={statelessDialogConfig}>
          <RootNavigator />
        </StatelessDialogProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
