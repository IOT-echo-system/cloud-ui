export enum StorageKeys {
  AUTH = 'AUTH',
  PREMISES_VIEW = 'PREMISES_VIEW'
}

export const setStorage = <T extends Record<string, unknown>>(key: StorageKeys, value: T): T => {
  window.localStorage.setItem(key, JSON.stringify(value))
  return value
}

export const clearStorage = (key: StorageKeys): void => {
  window.localStorage.removeItem(key)
}

export const getStorage = <T extends Record<string, unknown>>(key: StorageKeys): T | null => {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? '{}') as T
  } catch (error) {
    return null
  }
}
