import {UserAction} from '../reducers/user'
import {User} from '@/typing/user'

export const setUser = (user: User) => {
  return {type: UserAction.SET_USER, payload: {user}}
}
