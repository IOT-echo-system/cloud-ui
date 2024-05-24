import type {NextPage} from 'next'
import {PolicyUtils} from '../../utils/policyUtils'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {Routines} from '../../components/templates/routines/Routines'

const RoutinesPage: NextPage = () => {
  return <PageAllowed policyId={PolicyUtils.ROUTINE_GET} Component={Routines} />
}

export default RoutinesPage
