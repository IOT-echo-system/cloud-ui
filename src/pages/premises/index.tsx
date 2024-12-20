import type {NextPage} from 'next'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {Premises} from '../../components/templates/premises/Premises'

const BoardsPage: NextPage = () => {
  return <PageAllowed policy={PolicyUtils.PREMISES_READ} Component={Premises} />
}

export default BoardsPage
