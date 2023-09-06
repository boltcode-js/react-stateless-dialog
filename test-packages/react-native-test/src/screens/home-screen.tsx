import React from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProgressManager } from '@react-stateless-dialog/core/src';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Button title="Dialog Manager" onPress={() => navigation.navigate('DialogManager')} />
          <Button
            title="Progress"
            onPress={() => {
              ProgressManager().show('Hello world !');
              setTimeout(() => ProgressManager().hide(), 2000);
            }}
          />
          <Button title="Playground" onPress={() => navigation.navigate('Playground')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
