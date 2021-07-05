import {getObject} from '../../helper/AsyncStorage';
import {
  getCategories,
  getSingers,
  getSongs,
  getPopularSongs,
} from '../../services/api';

export const SONG_LOADING = 'SONG_LOADING';
export const SONG_FETCH_SUCCESS = 'SONG_FETCH_SUCCESS';
export const SONG_FETCH_FAILURE = 'SONG_FETCH_FAILURE';
export const SONG_FETCH_LOAD_MORE = 'SONG_FETCH_LOAD_MORE';

export const fetchSongs = () => {
  return async dispatch => {
    dispatch({
      type: SONG_LOADING,
    });

    try {
      const favoriteSongs = await getObject('favorite');
      const songs = await getPopularSongs();

      dispatch({
        type: SONG_FETCH_SUCCESS,
        favoriteSongs: favoriteSongs ? favoriteSongs : [],
        songs: songs.map(e => ({
          href: e.music,
          title: e.title,
          img: e.avatar,
          singer: e.creator,
          avatar: e.bgImage,
        })),
      });
    } catch (error) {
      dispatch({
        type: SONG_FETCH_FAILURE,
      });
      throw new Error(err);
    }

    // axios
    //   .get(API_URL)
    //   .then(({data}) => {
    //     // const songs = data.today;
    //     const songs = data.songs['VN'][0].songs.map(e => ({
    //       href: e.music,
    //       title: e.title,
    //       img: e.avatar,
    //       singer: e.creator,
    //       avatar: e.bgImage,
    //     }));
    //     // return;
    //     dispatch({
    //       type: SONG_FETCH_SUCCESS,
    //       songs: songs,
    //       favoriteSongs: favoriteSongs ? favoriteSongs : [],
    //       // favoriteSongs: data.today,
    //     });
    //   })
    //   .catch(err => {
    //     dispatch({
    //       type: SONG_FETCH_FAILURE,
    //     });
    //     throw new Error(err);
    //   });
  };
};
