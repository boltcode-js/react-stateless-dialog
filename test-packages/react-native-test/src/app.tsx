/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactStatelessDialogProvider } from '@react-stateless-dialog/core/src/react-stateless-dialog-provider';
import { RootNavigator } from './navigation/root-navigator';
import { DialogConsumer } from '@react-stateless-dialog/native/src/dialog-consumer/dialog-consumer';
import { Keyboard } from 'react-native';

function App() {
  return (
    <SafeAreaProvider>
      <ReactStatelessDialogProvider DialogConsumer={DialogConsumer} pushDialogMiddleware={Keyboard.dismiss}>
        <RootNavigator />
      </ReactStatelessDialogProvider>
    </SafeAreaProvider>
  );
}

export default App;
