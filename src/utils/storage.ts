const UNDEFINED = 'undefined'

export enum StorageKeys {
  AUTH= 'AUTH'
}
export const setStorage = <T extends Record<string, unknown>>(key: StorageKeys, value: T): T => {
  if (typeof window !== UNDEFINED) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  return value
}

export const clearStorage = (key: StorageKeys): void => {
  if (typeof window !== UNDEFINED) {
    window.localStorage.removeItem(key)
  }
}

export const getStorage = <T extends Record<string, unknown>>(key: StorageKeys): T | null => {
  try {
    if (typeof window !== UNDEFINED) {
      return JSON.parse(window.localStorage.getItem(key) ?? '') as T
    }
    return null
  } catch (error) {
    return null
  }
}
