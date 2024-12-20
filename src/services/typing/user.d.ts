import type {LoginReqBody} from './auth'
import type {User} from '../../typing/user'

export type RegistrationReqBody = LoginReqBody & {name: string}
export type RegistrationResBody = {email: string; name: string; userId: string}
export type UserResBody = User
