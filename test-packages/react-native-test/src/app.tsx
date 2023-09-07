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

const statelessDialogConfig = overrideStatelessDialogConfig(StatelessDialogConfigNative, {
  snackbar: {
    DefaultSnackbar: BannerSnackbar,
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <StatelessDialogProvider config={statelessDialogConfig}>
        <RootNavigator />
      </StatelessDialogProvider>
    </SafeAreaProvider>
  );
}

export default App;
