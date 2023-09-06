import React from 'react';
import { PixelRatio, SafeAreaView, Text, View } from 'react-native';

export const PlaygroundScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ fontSize: 10, backgroundColor: 'green' }}>Font size 10</Text>
      <Text style={{ fontSize: 40, backgroundColor: 'yellow' }}>Font size 40</Text>
      <Text>Density {PixelRatio.get()}</Text>
      <View style={{ height: 50, width: 200, backgroundColor: 'red' }}>
        <Text>Height 50 / Width 200</Text>
      </View>
      <View style={{ height: 100, width: 300, backgroundColor: 'green' }}>
        <Text>Height 100 / Width 300</Text>
      </View>
    </SafeAreaView>
  );
};
