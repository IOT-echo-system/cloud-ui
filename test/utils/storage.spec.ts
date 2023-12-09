import {clearStorage, getStorage, setStorage, StorageKeys} from '../../src/utils/storage'

describe('Storage Test', () => {
  it('should set storage', () => {
    const mockSetItem = jest.fn()
    jest.spyOn(window, 'localStorage', 'get').mockReturnValue({...window.localStorage, setItem: mockSetItem})

    setStorage(StorageKeys.AUTH, {value: 'value'})

    expect(mockSetItem).toHaveBeenCalledTimes(1)
    expect(mockSetItem).toHaveBeenCalledWith(StorageKeys.AUTH, JSON.stringify({value: 'value'}))
  })

  it('should clear storage', () => {
    const mockClearItem = jest.fn()
    jest.spyOn(window, 'localStorage', 'get').mockReturnValue({...window.localStorage, removeItem: mockClearItem})

    clearStorage(StorageKeys.AUTH)

    expect(mockClearItem).toHaveBeenCalledTimes(1)
    expect(mockClearItem).toHaveBeenCalledWith(StorageKeys.AUTH)
  })

  it('should get storage value', () => {
    const mockGetItem = jest.fn().mockReturnValue('{}')
    jest.spyOn(window, 'localStorage', 'get').mockReturnValue({...window.localStorage, getItem: mockGetItem})

    const item = getStorage(StorageKeys.AUTH)

    expect(item).toStrictEqual({})

    expect(mockGetItem).toHaveBeenCalledTimes(1)
    expect(mockGetItem).toHaveBeenCalledWith(StorageKeys.AUTH)
  })

  it('should get storage value with invalid value', () => {
    const mockGetItem = jest.fn().mockReturnValue(undefined)
    jest.spyOn(window, 'localStorage', 'get').mockReturnValue({...window.localStorage, getItem: mockGetItem})

    const item = getStorage(StorageKeys.AUTH)

    expect(item).toStrictEqual(null)

    expect(mockGetItem).toHaveBeenCalledTimes(1)
    expect(mockGetItem).toHaveBeenCalledWith(StorageKeys.AUTH)
  })
})
