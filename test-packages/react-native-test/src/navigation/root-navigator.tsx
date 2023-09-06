import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/home-screen';
import { DialogManagerScreen } from '../screens/dialog-manager/dialog-manager-screen';
import { PlaygroundScreen } from '../screens/playground/playground-screen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Playground" component={PlaygroundScreen} />
        <Stack.Screen name="DialogManager" component={DialogManagerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
