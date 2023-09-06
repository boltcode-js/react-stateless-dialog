import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SnackbarManager } from '@react-stateless-dialog/core/src';
import { BannerSnackbar } from './snackbars/banner-snackbar';
import CheckBox from '@react-native-community/checkbox';
import { SnackbarConfig } from '@react-stateless-dialog/core/src/snackbar-manager/models/snackbar-config';
import { ToastSnackbar } from './snackbars/toast-snackbar';

export const SnackbarManagerScreen = () => {
  const [vertical, setVertical] = useState<SnackbarConfig['vertical']>('top');
  const [horizontal, setHorizontal] = useState<SnackbarConfig['horizontal']>('left');
  const [animationType, setAnimation] = useState<SnackbarConfig['animationType']>('none');

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }}>
        <Button
          title="Banner Snackbar"
          onPress={() => {
            SnackbarManager().push(BannerSnackbar, { message: 'Hello world' });
          }}
        />
        <Button
          title="Toast Snackbar"
          onPress={() => {
            SnackbarManager().push(ToastSnackbar, { message: 'Hello world' }, { duration: 2000, vertical, horizontal, animationType, insideSafeArea: true });
          }}
        />
      </View>
      <View style={{ borderTopWidth: 1, borderColor: 'black', width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Vertical</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setVertical('top')}>
              <CheckBox value={vertical === 'top'} />
              <Text style={{ marginStart: 10 }}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setVertical('center')}>
              <CheckBox value={vertical === 'center'} />
              <Text style={{ marginStart: 10 }}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setVertical('bottom')}>
              <CheckBox value={vertical === 'bottom'} />
              <Text style={{ marginStart: 10 }}>Bottom</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Horizontal</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setHorizontal('left')}>
              <CheckBox value={horizontal === 'left'} />
              <Text style={{ marginStart: 10 }}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setHorizontal('center')}>
              <CheckBox value={horizontal === 'center'} />
              <Text style={{ marginStart: 10 }}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setHorizontal('right')}>
              <CheckBox value={horizontal === 'right'} />
              <Text style={{ marginStart: 10 }}>Right</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setHorizontal('stretch')}>
              <CheckBox value={horizontal === 'stretch'} />
              <Text style={{ marginStart: 10 }}>Stretch</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderColor: 'black', padding: 20 }}>
          <Text style={{ marginBottom: 10 }}>Animation</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }} onPress={() => setAnimation('none')}>
              <CheckBox value={animationType === 'none'} />
              <Text style={{ marginStart: 10 }}>None</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }} onPress={() => setAnimation('slide')}>
              <CheckBox value={animationType === 'slide'} />
              <Text style={{ marginStart: 10 }}>Slide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }} onPress={() => setAnimation('fade')}>
              <CheckBox value={animationType === 'fade'} />
              <Text style={{ marginStart: 10 }}>Fade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
