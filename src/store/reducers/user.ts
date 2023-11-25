import type {TRootActions} from '@/typing/store'
import type {User} from '@/typing/user'

export const UserAction = {
  SET_USER: 'SET_USER'
} as const

export const initUserState: User = {
  email: '', name: ''
}

const userReducer = (state: User, action: TRootActions): User => {
  switch (action.type) {
    case UserAction.SET_USER:
      return {...state, ...action.payload.user}
    default:
      return state
  }
}

export default userReducer
