import React from 'react';
import {View, Text, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
export const PlaySlider = ({
  playSeconds,
  duration,
  playSecondsString,
  durationString,
  handleOnValueChange,
  handleOnSlidingStart,
  handleOnSlidingComplete,
}) => {
  return (
    <View
      style={{
        marginVertical: 15,
        marginHorizontal: 5,
      }}>
      <Slider
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="#e12f81"
        maximumTrackTintColor="white"
        tapToSeek={true}
        onValueChange={e => handleOnValueChange(e)}
        onSlidingStart={e => handleOnSlidingStart(e)}
        onSlidingComplete={e => handleOnSlidingComplete(e)}
        value={playSeconds}
        // style={{
        //   flex: 1,
        //   alignSelf: 'center',
        //   marginHorizontal: Platform.select({ios: 5}),
        //   width: '100%',
        //   height: 40,
        // }}
      />

      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'white', alignSelf: 'center'}}>
          {playSecondsString}
        </Text>
        <Text style={{color: 'white', alignSelf: 'center'}}>
          {durationString}
        </Text>
      </View>
    </View>
  );
};
