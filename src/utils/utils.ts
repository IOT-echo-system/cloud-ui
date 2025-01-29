import type {Feed, Feeds} from '../typing/feed'
import type {Board, Boards} from '../typing/board'

export const unique = <T>(list: T[]): T[] => {
  return list.reduce<T[]>((items, item) => {
    return items.includes(item) ? items : items.concat(item)
  }, [])
}

export const getList = <T extends Feed | Board>(records: Feeds | Boards, premisesId: string): T[] => {
  return Object.keys(records)
    .map(id => records[id])
    .filter(feed => feed.premisesId === premisesId) as T[]
}
