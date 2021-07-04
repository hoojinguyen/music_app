import React from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { Icon } from "react-native-elements";

export const PlayList = ({ songs, isShowListSong, selectSong }) => {
  return (
    <View
      style={{
        display: !isShowListSong ? "none" : "flex",
        flex: 1,
      }}
    >
      <FlatList
        data={songs}
        keyExtractor={(item) => item.href}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => selectSong(index)}>
            <View style={{ flexDirection: "row", margin: 9 }}>
              <Image
                source={{ uri: item.img }}
                style={{ width: 60, height: 60 }}
              />
              <Text
                numberOfLines={2}
                style={{
                  paddingHorizontal: 9,
                  flex: 3,
                  color: "white",
                }}
              >
                {item.title.slice()}
              </Text>
              <Icon
                name="play-circle-outline"
                size={30}
                color="#517fa4"
                type="FontAwesome"
              />
            </View>
            <View
              style={{ flex: 1, height: 1, backgroundColor: "grey" }}
            ></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
