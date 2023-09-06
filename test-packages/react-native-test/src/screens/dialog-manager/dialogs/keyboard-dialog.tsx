import React, { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DialogContext, DialogManager } from '@react-stateless-dialog/core/src';
import { ConfirmDialog } from './confirm-dialog';

export const KeyboardDialog = (_uProps: DialogContext<null, null>) => {
  const data = useMemo(() => {
    const size = 100;
    let _data = new Array<string>(size);
    for (let i = 0; i < size; i++) {
      _data[i] = `${i}`;
    }
    return _data;
  }, []);

  const renderItem = useCallback((info: ListRenderItemInfo<string>) => {
    return (
      <TouchableOpacity
        style={{ padding: 10, borderRadius: 5, backgroundColor: 'white', marginBottom: 5 }}
        onPress={async () => {
          await DialogManager().push(ConfirmDialog, { message: 'Hello world' }).waitIgnoreCancel();
        }}>
        <Text>{info.item}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{ borderWidth: 1, backgroundColor: 'silver', padding: 20, width: '80%', flex: 1 }}>
      <TextInput style={{ backgroundColor: 'white', borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
      <FlatList data={data} renderItem={renderItem} keyboardShouldPersistTaps="always" />
    </View>
  );
};
