import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const TabsView = ({tabSelected, handleChangeTab}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#e12f81',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 100,
        paddingTop: 10,
      }}>
      <TouchableOpacity onPress={() => handleChangeTab('all')}>
        <Text
          style={{
            color: tabSelected == 'all' ? 'black' : 'white',
            fontWeight: tabSelected == 'all' ? 'bold' : 'normal',
            fontSize: 15,
          }}>
          {' '}
          Danh sách nhạc{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleChangeTab('artist')}>
        <Text
          style={{
            color: tabSelected == 'artist' ? 'black' : 'white',
            fontWeight: tabSelected == 'artist' ? 'bold' : 'normal',
            fontSize: 15,
          }}>
          {' '}
          Nghệ sĩ{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleChangeTab('favorite')}>
        <Text
          style={{
            color: tabSelected == 'favorite' ? 'black' : 'white',
            fontWeight: tabSelected == 'favorite' ? 'bold' : 'normal',
            fontSize: 15,
          }}>
          {' '}
          Ds yêu thích{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
