import {userBuilder} from '../../builders/stateBuilder'
import {setUser} from '../../../src/store/actions/user'
import {UserAction} from '../../../src/store/reducers/user'

describe('Actions User Test', () => {
  it('should set user', () => {
    const user = userBuilder()
    const action = setUser(user)

    expect(action).toStrictEqual({type: UserAction.SET_USER, payload: {user}})
  })
})
