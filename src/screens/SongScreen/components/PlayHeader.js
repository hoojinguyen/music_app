import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const PlayHeader = ({ isShowListSong, backHome, openListSong }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={() => backHome()}>
        <Icon
          name="chevron-left"
          size={20}
          color="#e12f81"
          type="font-awesome-5"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="library-music"
          size={30}
          color="#e12f81"
          type="FontAwesome"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openListSong()}>
        <Icon
          name={!isShowListSong ? "clipboard-list" : "images"}
          size={27}
          color="#e12f81"
          type="font-awesome-5"
        />
      </TouchableOpacity>
    </View>
  );
};
