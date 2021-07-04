import axios from 'axios';
import {getObject} from '../../helper/AsyncStorage';

export const SONG_LOADING = 'SONG_LOADING';
export const SONG_FETCH_SUCCESS = 'SONG_FETCH_SUCCESS';
export const SONG_FETCH_FAILURE = 'SONG_FETCH_FAILURE';
export const SONG_FETCH_LOAD_MORE = 'SONG_FETCH_LOAD_MORE';

// const API_URL = 'https://music-serverasp.herokuapp.com/music/today_music';
// const API_URL = 'http://localhost:9090/music/today_music';
const API_URL =
  'https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST';

export const fetchSongs = () => {
  return async dispatch => {
    dispatch({
      type: SONG_LOADING,
    });

    const favoriteSongs = await getObject('favorite');

    // const sleep = (ms) => {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // };

    // await sleep(50);

    axios
      .get(API_URL)
      .then(({data}) => {
        // const songs = data.today;
        const songs = data.songs['top100-VN'][0].songs.map(e => ({
          href: e.music,
          title: e.title,
          img: e.avatar,
          singer: e.creator,
          avatar: e.bgImage,
        }));
        // return;
        dispatch({
          type: SONG_FETCH_SUCCESS,
          songs: songs,
          favoriteSongs: favoriteSongs ? favoriteSongs : [],
          // favoriteSongs: data.today,
        });
      })
      .catch(err => {
        dispatch({
          type: SONG_FETCH_FAILURE,
        });
        throw new Error(err);
      });
  };
};
