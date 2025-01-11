export type Feed = {
  boardId: string
  premisesId: string
  name: string
  type: string
  value: number
}

export type Feeds = Record<string, Feed>
