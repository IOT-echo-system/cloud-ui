import {userBuilder} from '../../builders/stateBuilder'
import userReducer, {UserAction} from '@/store/reducers/user'
import type {TRootActions} from '@/typing/store'

describe('Reducer User Test', () => {
  it('should get default user details', () => {
    const user = userBuilder()

    const userDetails = userReducer(user, {} as unknown as TRootActions)

    expect(userDetails).toStrictEqual(user)
  })

  it('should set user', () => {
    const user = userBuilder()
    const newUser = userBuilder({name: 'User'})
    const updatedUser = userReducer(user, {type: UserAction.SET_USER, payload: {user: newUser}})

    expect(updatedUser.name).toStrictEqual('User')
  })
})
