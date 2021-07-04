import React, {useState, useEffect} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import Sound from 'react-native-sound';

import {useDispatch, useSelector} from 'react-redux';
import {fetchSongs} from '../../reducers';

import {
  PlayList,
  PlayHeader,
  PlayBrowser,
  PlaySlider,
  PlayInformation,
} from './components';

import {getObject, setObject} from '../../helper/AsyncStorage';
import {ListSong} from '../HomeScreen/components';

const getAudioTimeString = seconds => {
  const m = parseInt((seconds % (60 * 60)) / 60);
  const s = parseInt(seconds % 60);

  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
};

export const SongScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isLoading, songs, favoriteSongs} = useSelector(state => state.song);

  const [typeList, setTypeList] = useState('all');
  const [songList, setSongList] = useState([]);
  const [song, setSong] = useState(null);
  const [positionSong, setPositionSong] = useState(0);
  const [keySong, setKeySong] = useState('');

  const [sliderEditing, setSliderEditing] = useState(false);
  const [playState, setPlayState] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [playSeconds, setPlaySeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isFavoriteSong, setIsFavoriteSong] = useState(false);
  const [isShowListSong, setIsShowListSong] = useState(false);
  const [playSecondsString, setPlaySecondsString] = useState(false);
  const [durationString, setDurationString] = useState(false);

  const [sound, setSound] = useState(null);
  const [timeInterval, setTimeInterval] = useState(null);

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function handleResetSound() {
    sound.stop();
    sound.release();
    setSound(null);
    setIsPlaying(false);

    await sleep(500);
  }

  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(fetchSongs());
      } catch (err) {
        alert(err);
      }
    };
    fetching();

    return () => {
      setIsShowListSong(false);
    };
  }, []);

  useEffect(() => {
    if (song && song.href) {
      var soundNew = new Sound(song.href, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        } else {
          console.log('Load Sound');
          soundNew.play(success => {
            console.log('🚀 ~ success', success);
          });
          setSound(soundNew);
          setIsPlaying(true);
          setDuration(soundNew.getDuration());
        }
      });
    }
  }, [keySong]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && sound.isLoaded() && isPlaying && !sliderEditing) {
        sound.getCurrentTime((seconds, isPlaying) => {
          setPlaySeconds(seconds);
        });
      }
    }, 1000);
    setTimeInterval(interval);
  }, [sound, isPlaying, sliderEditing]);

  useEffect(() => {
    const {song, keySong, position, typeList} = route.params;
    setSong(song);
    setKeySong(keySong);
    setTypeList(typeList);
    setPositionSong(position);

    const checkSong = async () => {
      const list = await getObject('favorite');
      const isExist = list.find(e => e.title == song.title);
      setIsFavoriteSong(!!isExist);
    };

    checkSong();
  }, [route]);

  useEffect(() => {
    if (songs.length) {
      setSongList(typeList == 'all' ? songs : favoriteSongs);
    }
  }, [songs, typeList]);

  useEffect(() => {
    const playSecondsString = getAudioTimeString(playSeconds);
    const durationString = getAudioTimeString(duration);

    setPlaySecondsString(playSecondsString);
    setDurationString(durationString);
  }, [playSeconds, duration]);

  if (isLoading || !song) {
    return (
      <View
        style={{
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View
        numberOfLines={2}
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
          paddingHorizontal: 4,
          paddingTop: 40,
        }}>
        <PlayHeader
          isShowListSong={isShowListSong}
          backHome={async () => {
            sound.stop();
            sound.release();
            setSound(null);
            setIsPlaying(false);
            clearInterval(timeInterval);

            await dispatch(fetchSongs());
            navigation.goBack();
          }}
          openListSong={() => setIsShowListSong(!isShowListSong)}
        />

        <PlayList
          isShowListSong={isShowListSong}
          songs={songList}
          selectSong={e => {
            console.log('song index: ', e);
          }}
        />

        <View style={{display: isShowListSong ? 'none' : 'flex', flex: 1}}>
          <Image
            source={{uri: song.img}}
            style={{
              width: '100%',
              height: '100%',
              marginBottom: 15,
              alignSelf: 'center',
            }}
          />
        </View>

        <View style={{margin: 10}}>
          <PlayInformation
            nameSong={song.title}
            nameSinger={song.singer}
            isFavoriteSong={isFavoriteSong}
            handleChangeFavoriteSong={async () => {
              let status = !isFavoriteSong;
              setIsFavoriteSong(status);

              let list = await getObject('favorite');
              list = list ? list : [];

              if (status) {
                list.push(song);
              } else {
                list = list.filter(e => e.title != song.title);
              }

              await setObject('favorite', list);
            }}
          />

          <PlaySlider
            playSeconds={playSeconds}
            duration={duration}
            playSecondsString={playSecondsString}
            durationString={durationString}
            handleOnValueChange={e => {
              if (sound && sound.isLoaded() && isPlaying) {
                sound.setCurrentTime(e);
                setPlaySeconds(e);
              }
            }}
            handleOnSlidingStart={() => {
              setSliderEditing(true);
            }}
            handleOnSlidingComplete={() => {
              setSliderEditing(false);
            }}
          />

          <PlayBrowser
            isLoop={isLoop}
            isPlaying={isPlaying}
            isRandom={isRandom}
            handleLoopSong={() => setIsLoop(!isLoop)}
            handleRandomSong={() => setIsRandom(!isRandom)}
            handlePlaySong={() => {
              const status = !isPlaying;

              setIsPlaying(status);

              if (status) {
                sound.play();
              } else {
                sound.pause();
              }
            }}
            handleNextSong={async () => {
              let length = songList.length;
              let pos = positionSong + 1;

              if (isRandom) {
                const rand = Math.floor(Math.random() * length);
                pos = rand != pos ? rand : pos;
              }

              if (pos >= length || pos < 0) {
                pos = 0;
              }

              const songNew = songs[pos];

              if (songNew) {
                await handleResetSound();

                setSong(songNew);
                setKeySong(songNew.title);
                setPositionSong(pos);
              }
            }}
            handlePreviousSong={async () => {
              let length = songList.length;
              let pos = positionSong - 1;

              if (isRandom) {
                const rand = Math.floor(Math.random() * length);
                pos = rand != pos ? rand : pos;
              }

              if (pos >= length || pos < 0) {
                pos = 0;
              }

              const songNew = songs[pos];

              if (songNew) {
                await handleResetSound();

                setSong(songNew);
                setKeySong(songNew.title);
                setPositionSong(pos);
              }
            }}
          />
        </View>
      </View>
    );
  }
};
