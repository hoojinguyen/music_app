import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
export const ListArtist = ({artists}) => {
  return (
    <ScrollView
      style={{
        marginTop: -80,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: '#23282c',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {artists.map((e, index) => {
          if (index < 30 && e.avatar) {
            return (
              <View key={index} style={{margin: 10}}>
                <Avatar
                  rounded
                  size="large"
                  source={{
                    uri: e.avatar,
                  }}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    paddingTop: 10,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {e.singer.split(',')[0]}
                </Text>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};
