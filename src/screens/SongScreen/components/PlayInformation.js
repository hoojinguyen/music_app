import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export const PlayInformation = ({
  nameSong,
  nameSinger,
  isFavoriteSong,
  handleChangeFavoriteSong,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          marginHorizontal: 10,
        }}>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {nameSong}
        </Text>

        <TouchableOpacity onPress={() => handleChangeFavoriteSong()}>
          <Icon
            name="heart"
            size={24}
            color={isFavoriteSong ? '#e12f81' : 'white'}
            type="ionicon"></Icon>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'grey',
          fontSize: 14,
          paddingLeft: 10,
        }}>
        {nameSinger}
      </Text>
    </View>
  );
};
