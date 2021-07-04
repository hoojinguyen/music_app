import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export const PlayBrowser = ({
  isLoop,
  isPlaying,
  isRandom,
  handleLoopSong,
  handlePlaySong,
  handleRandomSong,
  handleNextSong,
  handlePreviousSong,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => handleLoopSong()}
      >
        <Icon
          name="repeat"
          size={24}
          color={isLoop ? "#e12f81" : "white"}
          type="ionicon"
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handlePreviousSong()}
          style={{ marginTop: 12 }}
        >
          <Icon name="play-skip-back" size={35} color="white" type="ionicon" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePlaySong()}
          style={{ marginHorizontal: 40 }}
        >
          <Icon
            name={isPlaying ? "play-circle" : "pause-circle"}
            size={60}
            color="white"
            type="ionicon"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNextSong()}
          style={{ marginTop: 12 }}
        >
          <Icon
            name="play-skip-forward"
            size={35}
            color="white"
            type="ionicon"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => handleRandomSong()}
      >
        <Icon
          name="shuffle"
          size={24}
          color={isRandom ? "#e12f81" : "white"}
          type="ionicon"
        />
      </TouchableOpacity>
    </View>
  );
};
