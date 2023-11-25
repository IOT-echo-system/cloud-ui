import type {User} from '@/typing/user'
import {UserAction} from '@/store/reducers/user'

export const setUser = (user: User) => {
  return {type: UserAction.SET_USER, payload: {user}}
}
