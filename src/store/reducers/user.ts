import type {User} from '../../typing/user'
import type {TRootActions} from '../../typing/store'

export const UserAction = {
  SET_USER: 'SET_USER'
} as const

export const initUserState: User = {
  roleId: '',
  registeredAt: new Date(),
  userId: '',
  email: '',
  name: '',
  policies: []
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
