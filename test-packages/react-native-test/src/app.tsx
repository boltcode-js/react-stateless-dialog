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
import { overrideStatelessDialogConfig } from '@react-stateless-dialog/core/src/config/stateless-dialog-config';
import { StatelessDialogConfigNative } from '@react-stateless-dialog/native/src/native-config';
import { StatelessDialogProvider } from '@react-stateless-dialog/core/src/stateless-dialog-provider';
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
