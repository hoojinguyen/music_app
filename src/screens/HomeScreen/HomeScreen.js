import React, {useEffect, useState, useCallback} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {fetchSongs} from '../../reducers';

import {TabsView, ListSong, ListArtist} from './components';

import {SearchBar} from 'react-native-elements';

const searchSongs = async (songs, key) => {
  const arr = songs.filter(item => {
    const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
    const textData = key.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  await sleep(500);

  return arr;
};

export const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {isLoading, songs, favoriteSongs} = useSelector(state => state.song);

  const [keySearch, setKeySearch] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [tabSelected, setTabSelected] = useState('all');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        await dispatch(fetchSongs());
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, []);

  const handleChangeTab = useCallback(e => {
    setTabSelected(e);
  }, []);

  const handleOpenSong = useCallback(({song, position}) => {
    navigation.navigate('Song', {
      keySong: song.title,
      song,
      position,
      typeList: tabSelected,
    });
  });

  useEffect(() => {
    if (!keySearch) {
      setLoadingSearch(false);
      setSearchList([]);
    } else {
      setLoadingSearch(true);

      searchSongs(songs, keySearch).then(res => {
        setSearchList(res);
        setLoadingSearch(false);
      });
    }
  }, [keySearch]);

  const RenderBody = selected => {
    switch (selected) {
      case 'all':
        return <ListSong songs={songs} handleOpenSong={handleOpenSong} />;
      case 'favorite':
        return (
          <ListSong songs={favoriteSongs} handleOpenSong={handleOpenSong} />
        );
      case 'artist':
        return <ListArtist artists={songs} />;
      default:
        return <ListSong songs={songs} handleOpenSong={handleOpenSong} />;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: '#343a40'}}>
        <View style={{marginTop: 40}}></View>

        <SearchBar
          placeholder="Tìm kiếm bài hát"
          onChangeText={value => setKeySearch(value)}
          showLoading={loadingSearch}
          value={keySearch}
          containerStyle={{
            borderWidth: 0,
            shadowColor: '#343a40',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}
        />

        <View
          style={{
            display: searchList.length ? 'block' : 'none',
            position: 'absolute',
            backgroundColor: '#343a40',
            zIndex: 100,
            top: 100,
            right: 0,
            left: 0,
            width: '100%',
            height: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <FlatList
            data={searchList}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.5,
                  width: '100%',
                  backgroundColor: '#343a40',
                }}
              />
            )}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleOpenSong({song: item, position: index})}>
                <View style={{flexDirection: 'row', margin: 9}}>
                  <Image
                    source={{uri: item.img}}
                    style={{width: 35, height: 35}}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      paddingHorizontal: 12,
                      flex: 3,
                      color: 'white',
                    }}>
                    {item.title.slice(0)}
                  </Text>
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
        </View>

        <View style={{flex: 1, backgroundColor: '#343a40'}}>
          <View
            style={{
              backgroundColor: '#343a40',
            }}></View>
          <TabsView
            tabSelected={tabSelected}
            handleChangeTab={handleChangeTab}
          />
          {RenderBody(tabSelected)}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
