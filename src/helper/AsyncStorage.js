import AsyncStorage from '@react-native-async-storage/async-storage';

export const setString = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    throw e;
  }
};

export const setObject = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    console.log('🚀 ~ e', e);
    throw e;
  }
};

export const getString = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    return value || '';
  } catch (e) {
    throw e;
  }
};

export const getObject = async name => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw e;
  }
};

export const removeData = async name => {
  try {
    return await AsyncStorage.removeItem(name);
  } catch (e) {
    throw e;
  }
};

export const getAllData = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    throw e;
  }
};

export const clearAllData = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    throw e;
  }
};
