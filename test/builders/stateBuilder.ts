import type {User} from '../../src/typing/user'
import type {SiteStateType} from '../../src/typing/site'

export const siteBuilder = (props: Partial<SiteStateType> = {}): SiteStateType => {
  return {theme: 'light', title: '', menus: [], ...props}
}

export const userBuilder = (props: Partial<User> = {}): User => {
  return {email: '', name: '', userId: '', roleId: '', registeredAt: new Date(2024, 1, 1), policies: [], ...props}
}

// export const projectBuilder = (props: Partial<Project> = {}): Project => {
//   return {name: '', projectId: '', roles: [], policies: [], ...props}
// }

// export const globalStateBuilder = (props: Partial<TRootState> = {}): TRootState => {
//   return {
//     site: siteBuilder(),
//     user: userBuilder(),
//     project: projectBuilder(),
//     ...props
//   }
// }
