import DATA from './data.json';
import axios from 'axios';

const WAIT_TIME = 100;

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getCategories = async () => {
  await sleep(WAIT_TIME);

  const data = DATA.songs;

  let categories = [];

  for (const [key, value] of Object.entries(data)) {
    const types = value.map((e, i) => ({
      id: i,
      name: e.name,
    }));
    categories.push({id: key, name: key.split('_')[0], types});
  }

  return categories;
};

export const getSingers = async (category, type) => {
  await sleep(WAIT_TIME);

  const songs = DATA.songs[category][type].songs;
  const singers = songs
    ? songs
        .map((e, index) => ({
          id: index,
          name: e.creator,
          avatar: e.avatar,
        }))
        .reduce((pre, cur) => {
          if (pre.find(e => e.name == cur.name) == undefined) pre.push(cur);
          return pre;
        }, [])
    : [];

  return singers;
};

export const getSongs = async (category, type) => {
  await sleep(WAIT_TIME);

  const data = DATA.songs[category][type];
  return data ? data.songs : [];
};

export const getPopularSongs = async () => {
  await sleep(WAIT_TIME);

  return DATA.songs['top100_VN'][0].songs.slice(0, 9);
};
