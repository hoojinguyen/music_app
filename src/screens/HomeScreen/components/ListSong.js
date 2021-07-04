import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ListSong = ({songs, handleOpenSong}) => {
  return (
    <View
      style={{
        marginTop: -80,
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: '#23282c',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
      }}>
      {songs.length ? (
        <FlatList
          data={songs}
          keyExtractor={item => item.href}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleOpenSong({song: item, position: index})}>
              <View style={{flexDirection: 'row', margin: 9}}>
                <Image
                  source={{uri: item.img}}
                  style={{width: 60, height: 60}}
                />
                <View style={{paddingHorizontal: 12, flex: 3}}>
                  <Text
                    numberOfLines={2}
                    style={{
                      paddingVertical: 5,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      paddingVertical: 2,
                      color: 'white',
                      fontSize: 12,
                    }}>
                    {item.singer}
                  </Text>
                </View>

                <Icon
                  name="play-circle-outline"
                  size={30}
                  color="#517fa4"
                  type="FontAwesome"
                />
              </View>
              <View
                style={{flex: 1, height: 1, backgroundColor: 'grey'}}></View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 40,
            fontSize: 20,
            color: 'white',
          }}>
          Danh sách trống
        </Text>
      )}
    </View>
  );
};
