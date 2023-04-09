const setLocalStorageItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageItem = <T>(
  key: string,
  defaultValue?: T
): T | undefined => {
  const item = localStorage.getItem(key);
  if (item === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(item) as T;
  } catch (e) {
    return defaultValue;
  }
};

const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};

const clearLocalStorage = (): void => {
  localStorage.clear();
};

export default {
  setLocalStorageItem: setLocalStorageItem,
  getLocalStorageItem: getLocalStorageItem,
  removeLocalStorageItem: removeLocalStorageItem,
  clearLocalStorage: clearLocalStorage,
};
