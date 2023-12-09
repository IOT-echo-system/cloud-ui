import {UserAction} from '../reducers/user'
import type {User} from '@/typing/user'

export const setUser = (user: User) => {
  return {type: UserAction.SET_USER, payload: {user}}
}
