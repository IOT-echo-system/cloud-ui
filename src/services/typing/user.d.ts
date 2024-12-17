import type {LoginReqBody} from './auth'

export type RegistrationReqBody = LoginReqBody & {name: string}
export type RegistrationResBody = {email: string; name: string; userId: string}
