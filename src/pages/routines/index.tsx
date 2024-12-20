import type {NextPage} from 'next'
import {PolicyUtils} from '../../utils/policyUtils'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {Routines} from '../../components/templates/routines/Routines'

const RoutinesPage: NextPage = () => {
  return <PageAllowed policy={PolicyUtils.ROUTINE_READ} Component={Routines} />
}

export default RoutinesPage
