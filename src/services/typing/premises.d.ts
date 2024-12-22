import type {Address, Premises} from '../../typing/premises'

export type PremisesResBody = Premises
export type PremisesReqBody = {name: string; address: Address}
