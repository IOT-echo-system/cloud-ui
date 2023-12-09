import type {SiteStateType} from '../../src/store/reducers/site'
import type {User} from '../../src/typing/user'
import type {TRootState} from '../../src/typing/store'

export const siteBuilder = (props: Partial<SiteStateType> = {}): SiteStateType => {
  return {theme: 'light', title: '', ...props}
}

export const userBuilder = (props: Partial<User> = {}): User => {
  return {email: '', name: '', ...props}
}

export const globalStateBuilder = (props: Partial<TRootState> = {}): TRootState => {
  return {
    site: siteBuilder(),
    user: userBuilder(),
    ...props
  }
}
