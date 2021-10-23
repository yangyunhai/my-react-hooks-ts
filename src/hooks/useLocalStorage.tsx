import React, { useState, useEffect } from 'react';
const getObj=(value:any)=>{
  return typeof value === 'object' ? JSON.stringify(value) : `${value}`
}
/**
 * 本地存储对象
 */
const storage = {
  getItem(key:string) {
    return localStorage.getItem(key);
  },
  setItem(key:string, value:any) {
    localStorage.setItem(key,getObj(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  }
};

function tryParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * @param {*} key           存储key
 * @param {*} defaultValue  存储值
 * @returns
 */
export default function useLocalStorage(key: string, defaultValue: any) {
  const getDefault = key => {
    return storage.getItem(key) === null ? defaultValue : tryParse(storage.getItem(key));
  };

  const [state, setState] = useState(getDefault(key));

  const writeState = value => {
    storage.setItem(key, value);
    setState(value);
  };

  const deleteState = () => {
    storage.removeItem(key);
    setState(null);
  };

  useEffect(() => {
    writeState(defaultValue || getDefault(key));
  }, [key]);

  return [state, writeState, deleteState];
}
