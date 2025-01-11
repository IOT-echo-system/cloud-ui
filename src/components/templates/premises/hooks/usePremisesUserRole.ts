import {useSelector} from '../../../../hooks'

export const usePremisesUserRole = (): {isOwner: boolean; isAdmin: boolean; isUser: boolean} => {
  const {user} = useSelector(state => state.premises!)
  return {isOwner: user.role === 'OWNER', isAdmin: user.role === 'ADMIN', isUser: user.role === 'USER'}
}
