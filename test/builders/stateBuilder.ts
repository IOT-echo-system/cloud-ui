import {SiteStateType} from '@/store/reducers/site'
import {TRootState} from '@/typing/store'
import {User} from '@/typing/user'

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
