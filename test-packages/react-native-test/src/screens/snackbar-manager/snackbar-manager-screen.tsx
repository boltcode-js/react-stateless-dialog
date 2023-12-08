import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { DefaultSnackbarProps, SnackbarConfig, SnackbarManager } from '@react-stateless-dialog/core';
import CheckBox from '@react-native-community/checkbox';
import { ToastSnackbar } from './snackbars/toast-snackbar';

export const SnackbarManagerScreen = () => {
  const [defaultType, setDefaultType] = useState<DefaultSnackbarProps['type']>('success');
  const [config, setConfig] = useState<SnackbarConfig>({
    vertical: 'top',
    horizontal: 'left',
    animationType: 'none',
    insideSafeArea: false,
    enableGesture: false,
    slideFromPosition: undefined,
    duration: 3000,
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Button
          title="Default"
          onPress={() => {
            SnackbarManager().pushDefault(defaultType, 'Hey, this is a default message', config);
          }}
        />
        <Button
          title="Toast"
          onPress={() => {
            SnackbarManager().push(ToastSnackbar, { message: 'Hello world' }, config);
          }}
        />
      </View>
      <View style={{ width: '100%' }}>
        <View style={{ borderTopWidth: 1, borderColor: 'black', padding: 20 }}>
          <Text style={{ marginBottom: 10 }}>Default type</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginBottom: 10 }} onPress={() => setDefaultType('success')}>
              <CheckBox value={defaultType === 'success'} />
              <Text style={{ marginStart: 10 }}>Success</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginBottom: 10 }} onPress={() => setDefaultType('info')}>
              <CheckBox value={defaultType === 'info'} />
              <Text style={{ marginStart: 10 }}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginBottom: 10 }} onPress={() => setDefaultType('warn')}>
              <CheckBox value={defaultType === 'warn'} />
              <Text style={{ marginStart: 10 }}>Warn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginBottom: 10 }} onPress={() => setDefaultType('error')}>
              <CheckBox value={defaultType === 'error'} />
              <Text style={{ marginStart: 10 }}>Error</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: 'black', width: '100%' }}>
          <View style={{ flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Vertical</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, vertical: 'top' }))}>
              <CheckBox value={config.vertical === 'top'} />
              <Text style={{ marginStart: 10 }}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, vertical: 'center' }))}>
              <CheckBox value={config.vertical === 'center'} />
              <Text style={{ marginStart: 10 }}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, vertical: 'bottom' }))}>
              <CheckBox value={config.vertical === 'bottom'} />
              <Text style={{ marginStart: 10 }}>Bottom</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>Horizontal</Text>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, horizontal: 'left' }))}>
              <CheckBox value={config.horizontal === 'left'} />
              <Text style={{ marginStart: 10 }}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, horizontal: 'center' }))}>
              <CheckBox value={config.horizontal === 'center'} />
              <Text style={{ marginStart: 10 }}>Center</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, horizontal: 'right' }))}>
              <CheckBox value={config.horizontal === 'right'} />
              <Text style={{ marginStart: 10 }}>Right</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, horizontal: 'stretch' }))}>
              <CheckBox value={config.horizontal === 'stretch'} />
              <Text style={{ marginStart: 10 }}>Stretch</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderColor: 'black', padding: 20 }}>
          <Text style={{ marginBottom: 10 }}>Animation</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, animationType: 'none' }))}>
              <CheckBox value={config.animationType === 'none'} />
              <Text style={{ marginStart: 10 }}>None</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, animationType: 'slide' }))}>
              <CheckBox value={config.animationType === 'slide'} />
              <Text style={{ marginStart: 10 }}>Slide</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, animationType: 'fade' }))}>
              <CheckBox value={config.animationType === 'fade'} />
              <Text style={{ marginStart: 10 }}>Fade</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: 'black', width: '100%' }}>
          <View style={{ flex: 1, borderRightWidth: 1, borderColor: 'black', padding: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setConfig((old) => ({ ...old, enableGesture: !old.enableGesture }))}>
              <CheckBox value={config.enableGesture} />
              <Text style={{ marginStart: 10 }}>Gesture Enable</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, padding: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setConfig((old) => ({ ...old, insideSafeArea: !old.insideSafeArea }))}>
              <CheckBox value={config.insideSafeArea} />
              <Text style={{ marginStart: 10 }}>Inside SafeArea</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderColor: 'black', padding: 20, paddingBottom: 0 }}>
          <Text style={{ marginBottom: 10 }}>Slide from position</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginBottom: 10 }}
              onPress={() => setConfig((old) => ({ ...old, slideFromPosition: undefined }))}>
              <CheckBox value={config.slideFromPosition === undefined} />
              <Text style={{ marginStart: 10 }}>Undefined</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, slideFromPosition: 'top' }))}>
              <CheckBox value={config.slideFromPosition === 'top'} />
              <Text style={{ marginStart: 10 }}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, slideFromPosition: 'bottom' }))}>
              <CheckBox value={config.slideFromPosition === 'bottom'} />
              <Text style={{ marginStart: 10 }}>Bottom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, slideFromPosition: 'right' }))}>
              <CheckBox value={config.slideFromPosition === 'right'} />
              <Text style={{ marginStart: 10 }}>Right</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10 }}
              onPress={() => setConfig((old) => ({ ...old, slideFromPosition: 'left' }))}>
              <CheckBox value={config.slideFromPosition === 'left'} />
              <Text style={{ marginStart: 10 }}>Left</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
