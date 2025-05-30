'use client';

const useLocalStorage = () => {
  const isBrowser = typeof window !== 'undefined';
  
  const setOnLocalStorage = (key: string, value: string) => {
    if (isBrowser) {
      localStorage.setItem(key, value);
    }
  };
  
  const removeFromLocalStorage = (key: string) => {
    if (isBrowser) {
      localStorage.removeItem(key);
    }
  };
  
  const getFromLocalStorage = (key: string) => {
    if (isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  };
  
  return {
    setOnLocalStorage,
    removeFromLocalStorage,
    getFromLocalStorage
  };
};

export default useLocalStorage;