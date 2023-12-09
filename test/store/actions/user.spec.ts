import {userBuilder} from '../../builders/stateBuilder'
import {setUser} from '@/store/actions/user'
import {UserAction} from '@/store/reducers/user'

describe('Actions User Test', () => {
  it('should set user', () => {
    const user = userBuilder()
    const action = setUser(user)

    expect(action).toStrictEqual({type: UserAction.SET_USER, payload: {user}})
  })
})
