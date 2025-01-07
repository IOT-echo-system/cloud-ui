export type Board = {
  boardId: string
  premisesId: string
  name: string
  type: string
  createdBy: string
  createdAt: Date
}

export type Boards = Record<string, Board>
