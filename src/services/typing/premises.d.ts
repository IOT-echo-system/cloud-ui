import type {Address, Premises} from '../../typing/premises'
import type {Zone} from '../../typing/zones'
import type {Board} from '../../typing/board'

export type PremisesResBody = Premises & {zones: Zone[]; boards: Board[]}
export type PremisesReqBody = {name: string; address: Address}
